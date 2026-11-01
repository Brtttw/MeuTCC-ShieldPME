package br.com.shieldpme.api.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.UUID;
import java.util.regex.Pattern;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import br.com.shieldpme.api.exception.BusinessRuleException;
import br.com.shieldpme.api.exception.ResourceNotFoundException;
import br.com.shieldpme.api.util.PdfSignatureCheck;

/**
 * Armazenamento PRIVADO dos relatorios. Os arquivos ficam num diretorio fora de qualquer recurso estatico e
 * so sao lidos por este servico, depois de a camada acima autorizar o acesso. O nome em disco e gerado
 * pelo servidor (UUID); o nome enviado pelo usuario nunca e usado como caminho.
 */
@Service
public class ReportStorageService {

    private static final Pattern STORED_NAME = Pattern.compile("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\\.pdf$");

    private final Path root;
    private final long maxBytes;

    public ReportStorageService(@Value("${app.storage.reports-dir}") String dir,
                                @Value("${app.storage.max-report-bytes}") long maxBytes) throws IOException {
        this.root = Path.of(dir).toAbsolutePath().normalize();
        this.maxBytes = maxBytes;
        Files.createDirectories(root);
    }

    /** Valida o CONTEUDO: tamanho, assinatura/EOF e, por fim, um parse real com o PDFBox. */
    public void validate(byte[] data) {
        if (data == null || data.length == 0) throw new BusinessRuleException("O arquivo está vazio.");
        if (data.length > maxBytes)
            throw new BusinessRuleException("O arquivo excede o limite de " + (maxBytes / 1024 / 1024) + " MB.");
        if (!PdfSignatureCheck.looksLikePdf(data)) throw new BusinessRuleException("O arquivo enviado não é um PDF válido.");
        try (PDDocument doc = Loader.loadPDF(data)) {
            if (doc.isEncrypted()) throw new BusinessRuleException("PDFs protegidos por senha não são aceitos.");
            if (doc.getNumberOfPages() < 1) throw new BusinessRuleException("O PDF não possui páginas.");
        } catch (IOException | RuntimeException e) {
            if (e instanceof BusinessRuleException bre) throw bre;
            throw new BusinessRuleException("O arquivo enviado não é um PDF válido ou está corrompido.");
        }
    }

    /** Grava com nome interno aleatorio e devolve esse nome (e o que vai para reports.file_path). */
    public String store(byte[] data) {
        String name = UUID.randomUUID() + ".pdf";
        try {
            Files.write(resolve(name), data, StandardOpenOption.CREATE_NEW, StandardOpenOption.WRITE);
        } catch (IOException e) {
            throw new IllegalStateException("Falha ao gravar o relatório.", e);
        }
        return name;
    }

    public byte[] load(String storedName) {
        try {
            return Files.readAllBytes(resolve(storedName));
        } catch (NoSuchFileException e) {
            throw new ResourceNotFoundException("Arquivo do relatório não encontrado.");
        } catch (IOException e) {
            throw new IllegalStateException("Falha ao ler o relatório.", e);
        }
    }

    public void deleteQuietly(String storedName) {
        try {
            if (storedName != null) Files.deleteIfExists(resolve(storedName));
        } catch (IOException | RuntimeException ignored) {
            // melhor esforco: um arquivo orfao nao deve derrubar a operacao
        }
    }

    private Path resolve(String storedName) {
        if (storedName == null || !STORED_NAME.matcher(storedName).matches())
            throw new ResourceNotFoundException("Arquivo do relatório não encontrado.");
        Path path = root.resolve(storedName).normalize();
        if (!path.startsWith(root)) throw new ResourceNotFoundException("Arquivo do relatório não encontrado.");
        return path;
    }
}
