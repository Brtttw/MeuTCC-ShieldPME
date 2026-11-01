package br.com.shieldpme.api.util;

/** Validacao dos digitos verificadores do CNPJ (sem dependencias de framework). */
public final class CnpjValidator {
    private CnpjValidator() {}

    /** Remove pontuacao e devolve so os digitos. */
    public static String digitsOnly(String value) {
        return value == null ? "" : value.replaceAll("\\D", "");
    }

    public static boolean isValid(String value) {
        String cnpj = digitsOnly(value);
        if (cnpj.length() != 14 || cnpj.chars().distinct().count() == 1) return false;
        int d1 = digit(cnpj, 12, new int[] {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2});
        int d2 = digit(cnpj, 13, new int[] {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2});
        return d1 == cnpj.charAt(12) - '0' && d2 == cnpj.charAt(13) - '0';
    }

    private static int digit(String cnpj, int length, int[] weights) {
        int sum = 0;
        for (int i = 0; i < length; i++) sum += (cnpj.charAt(i) - '0') * weights[i];
        int mod = sum % 11;
        return mod < 2 ? 0 : 11 - mod;
    }
}
