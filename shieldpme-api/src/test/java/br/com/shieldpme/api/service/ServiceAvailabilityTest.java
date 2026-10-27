package br.com.shieldpme.api.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class ServiceAvailabilityTest {
    @Test void somenteOwaspZapPorPadrao() {
        ServiceAvailability a = new ServiceAvailability("OWASP ZAP");
        assertTrue(a.isRequestable("OWASP ZAP"));
        assertTrue(a.isRequestable("  owasp zap "));
        assertFalse(a.isRequestable("Firewall Corporativo"));
        assertFalse(a.isRequestable(null));
    }
    @Test void aceitaVariosNomes() {
        ServiceAvailability a = new ServiceAvailability("OWASP ZAP, Monitoramento");
        assertTrue(a.isRequestable("Monitoramento"));
        assertFalse(a.isRequestable("Outro"));
    }
    @Test void listaVaziaNaoLiberaNada() {
        assertFalse(new ServiceAvailability(" , ").isRequestable("OWASP ZAP"));
    }
}
