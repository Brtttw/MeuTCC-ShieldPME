package br.com.shieldpme.api.util;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class CnpjValidatorTest {
    @Test void aceitaCnpjValidoComOuSemPontuacao() {
        assertTrue(CnpjValidator.isValid("11.222.333/0001-81"));
        assertTrue(CnpjValidator.isValid("11222333000181"));
    }
    @Test void rejeitaInvalidos() {
        assertFalse(CnpjValidator.isValid("11222333000182"));
        assertFalse(CnpjValidator.isValid("11111111111111"));
        assertFalse(CnpjValidator.isValid("123"));
        assertFalse(CnpjValidator.isValid(null));
    }
}
