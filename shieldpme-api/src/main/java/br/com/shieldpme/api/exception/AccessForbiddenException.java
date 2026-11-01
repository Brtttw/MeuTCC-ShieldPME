package br.com.shieldpme.api.exception;

public class AccessForbiddenException extends RuntimeException {
    public AccessForbiddenException(String message) { super(message); }
}
