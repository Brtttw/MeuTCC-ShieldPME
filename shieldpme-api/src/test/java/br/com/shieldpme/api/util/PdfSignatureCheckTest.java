package br.com.shieldpme.api.util;

import static org.junit.jupiter.api.Assertions.*;

import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.Test;

class PdfSignatureCheckTest {
    private static byte[] b(String s) { return s.getBytes(StandardCharsets.ISO_8859_1); }

    @Test void aceitaEstruturaDePdf() {
        assertTrue(PdfSignatureCheck.looksLikePdf(b("%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n")));
    }
    @Test void rejeitaSemCabecalhoOuSemEof() {
        assertFalse(PdfSignatureCheck.looksLikePdf(b("%PDF-1.7\n" + "A".repeat(200))));
        assertFalse(PdfSignatureCheck.looksLikePdf(b("<html>" + "A".repeat(200) + "%%EOF")));
        assertFalse(PdfSignatureCheck.looksLikePdf(new byte[0]));
        assertFalse(PdfSignatureCheck.looksLikePdf(null));
    }
}
