package br.com.shieldpme.api.exception;

/** Usuario autenticado, mas sem permissao para a operacao (HTTP 403). */
public class AccessForbiddenException extends RuntimeException {
    public AccessForbiddenException(String message) { super(message); }
}
