package br.com.shieldpme.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.shieldpme.api.dto.RequestDtos.Catalog;
import br.com.shieldpme.api.service.ServiceRequestService;

/** Servicos e frequencias disponiveis para solicitacao (somente leitura, so ativos). */
@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
    private final ServiceRequestService requests;

    public CatalogController(ServiceRequestService requests) { this.requests = requests; }

    @GetMapping
    public Catalog catalog() { return requests.catalog(); }
}
