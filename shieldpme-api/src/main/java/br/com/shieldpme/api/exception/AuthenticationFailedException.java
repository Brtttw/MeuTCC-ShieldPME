package br.com.shieldpme.api.exception;

/** Credenciais invalidas (HTTP 401). */
public class AuthenticationFailedException extends RuntimeException {
    public AuthenticationFailedException(String message) { super(message); }
}
