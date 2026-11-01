package br.com.shieldpme.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import br.com.shieldpme.api.dto.RequestDtos.ClientReportView;
import br.com.shieldpme.api.dto.RequestDtos.CreateServiceRequest;
import br.com.shieldpme.api.dto.RequestDtos.RequestDetail;
import br.com.shieldpme.api.dto.RequestDtos.RequestSummary;
import br.com.shieldpme.api.security.AuthUser;
import br.com.shieldpme.api.service.ReportFileService;
import br.com.shieldpme.api.service.ServiceRequestService;
import jakarta.validation.Valid;

/** Area do cliente (papel CLIENT). Todo acesso e filtrado pelo usuario autenticado. */
@RestController
@RequestMapping("/api/client")
public class ClientRequestController {
    private final ServiceRequestService requests;
    private final ReportFileService reportFiles;

    public ClientRequestController(ServiceRequestService requests, ReportFileService reportFiles) {
        this.requests = requests;
        this.reportFiles = reportFiles;
    }

    @PostMapping("/requests")
    public ResponseEntity<RequestDetail> create(@AuthenticationPrincipal AuthUser user,
                                                @Valid @RequestBody CreateServiceRequest body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(requests.create(user, body));
    }

    @GetMapping("/requests")
    public List<RequestSummary> list(@AuthenticationPrincipal AuthUser user) { return requests.listForClient(user); }

    @GetMapping("/requests/{id}")
    public RequestDetail one(@AuthenticationPrincipal AuthUser user, @PathVariable Integer id) {
        return requests.detailForClient(user, id);
    }

    @GetMapping("/reports")
    public List<ClientReportView> reports(@AuthenticationPrincipal AuthUser user) { return reportFiles.listForClient(user); }

    @GetMapping("/reports/{id}/file")
    public ResponseEntity<byte[]> download(@AuthenticationPrincipal AuthUser user, @PathVariable Integer id) {
        return ReportResponses.pdf(reportFiles.downloadForClient(user, id));
    }
}
