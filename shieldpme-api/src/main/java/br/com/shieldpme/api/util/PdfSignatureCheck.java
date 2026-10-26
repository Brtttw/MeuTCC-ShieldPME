package br.com.shieldpme.api.util;

import java.nio.charset.StandardCharsets;

/** Verificacao barata e sem framework da estrutura de um PDF (assinatura "%PDF-" e marcador "%%EOF"). */
public final class PdfSignatureCheck {
    private PdfSignatureCheck() {}

    public static boolean looksLikePdf(byte[] data) {
        if (data == null || data.length < 16) return false;
        if (!new String(data, 0, 5, StandardCharsets.ISO_8859_1).equals("%PDF-")) return false;
        int tailStart = Math.max(0, data.length - 1024);
        String tail = new String(data, tailStart, data.length - tailStart, StandardCharsets.ISO_8859_1);
        return tail.contains("%%EOF");
    }
}
