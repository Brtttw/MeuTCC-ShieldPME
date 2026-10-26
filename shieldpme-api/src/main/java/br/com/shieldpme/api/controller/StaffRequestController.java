package br.com.shieldpme.api.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import br.com.shieldpme.api.dto.RequestDtos.NotificationList;
import br.com.shieldpme.api.dto.RequestDtos.ReportInfo;
import br.com.shieldpme.api.dto.RequestDtos.RequestDetail;
import br.com.shieldpme.api.dto.RequestDtos.RequestSummary;
import br.com.shieldpme.api.security.AuthUser;
import br.com.shieldpme.api.service.NotificationService;
import br.com.shieldpme.api.service.ReportFileService;
import br.com.shieldpme.api.service.ServiceRequestService;

/** Area do funcionario (papel EMPLOYEE com cadastro de funcionario ativo). Nao existe cadastro publico aqui. */
@RestController
@RequestMapping("/api/staff")
public class StaffRequestController {
    private final ServiceRequestService requests;
    private final ReportFileService reportFiles;
    private final NotificationService notifications;

    public StaffRequestController(ServiceRequestService requests, ReportFileService reportFiles,
                                  NotificationService notifications) {
        this.requests = requests;
        this.reportFiles = reportFiles;
        this.notifications = notifications;
    }

    @GetMapping("/requests")
    public List<RequestSummary> list(@AuthenticationPrincipal AuthUser user) { return requests.listForStaff(user); }

    @GetMapping("/requests/{id}")
    public RequestDetail one(@AuthenticationPrincipal AuthUser user, @PathVariable Integer id) {
        return requests.detailForStaff(user, id);
    }

    @PostMapping("/executions/{id}/claim")
    public ResponseEntity<Void> claim(@AuthenticationPrincipal AuthUser user, @PathVariable Integer id) {
        requests.claim(user, id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/executions/{id}/report", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ReportInfo upload(@AuthenticationPrincipal AuthUser user, @PathVariable Integer id,
                             @RequestPart("file") MultipartFile file,
                             @RequestParam(value = "title", required = false) String title) {
        return reportFiles.upload(user, id, title, file);
    }

    @GetMapping("/reports/{id}/file")
    public ResponseEntity<byte[]> download(@AuthenticationPrincipal AuthUser user, @PathVariable Integer id) {
        return ReportResponses.pdf(reportFiles.downloadForStaff(user, id));
    }

    @GetMapping("/notifications")
    public NotificationList notifications(@AuthenticationPrincipal AuthUser user) { return notifications.list(user); }

    @PostMapping("/notifications/{id}/read")
    public ResponseEntity<Void> markRead(@AuthenticationPrincipal AuthUser user, @PathVariable Integer id) {
        notifications.markRead(user, id);
        return ResponseEntity.noContent().build();
    }
}
