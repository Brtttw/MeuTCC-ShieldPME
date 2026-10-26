package br.com.shieldpme.api.controller;

import java.nio.charset.StandardCharsets;

import org.springframework.http.CacheControl;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import br.com.shieldpme.api.service.ReportFileService.ReportFile;

/** Resposta padrao de download de PDF: tipo fixo, sem cache e sem sniffing. */
final class ReportResponses {
    private ReportResponses() {}

    static ResponseEntity<byte[]> pdf(ReportFile file) {
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(file.content().length)
                .cacheControl(CacheControl.noStore())
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment().filename(file.fileName(), StandardCharsets.UTF_8).build().toString())
                .header("X-Content-Type-Options", "nosniff")
                .body(file.content());
    }
}
