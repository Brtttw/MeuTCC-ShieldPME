package br.com.shieldpme.api.exception;

public class AuthenticationFailedException extends RuntimeException {
    public AuthenticationFailedException(String message) { super(message); }
}
