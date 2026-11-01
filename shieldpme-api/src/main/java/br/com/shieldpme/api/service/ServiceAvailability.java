package br.com.shieldpme.api.service;

import java.util.Arrays;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Define quais servicos podem ser SOLICITADOS hoje. A lista vem de app.requestable-services (nomes separados por
 * virgula, como em service_offerings.name). Os demais continuam no catalogo e no banco, so nao podem ser pedidos.
 * Para habilitar outro servico no futuro basta incluir o nome na configuracao (sem mudar o banco).
 */
@Component
public class ServiceAvailability {

    private final Set<String> requestable;

    public ServiceAvailability(@Value("${app.requestable-services:OWASP ZAP}") String csv) {
        this.requestable = Arrays.stream(csv.split(","))
                .map(ServiceAvailability::key)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toUnmodifiableSet());
    }

    public boolean isRequestable(String serviceName) {
        return serviceName != null && requestable.contains(key(serviceName));
    }

    private static String key(String name) {
        return name.trim().toLowerCase(Locale.ROOT);
    }
}
