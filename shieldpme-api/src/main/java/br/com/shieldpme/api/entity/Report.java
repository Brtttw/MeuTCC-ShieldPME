package br.com.shieldpme.api.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@Entity
@Table (name = "reports", schema = "dbo")
public class Report {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "service_execution_id", nullable = false)
    private ServiceExecution serviceExecution;
    
    @Column(name = "responsible_employee_id")
    private Employee responsibleEmployee;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "file_name", length = 255)
    private String fileName;

    @Column(name = "file_path", length = 500)
    private String filePath;

    @Column(name = "generated_at")
    private LocalDateTime generatedAt;

    @Column(name = "released_at")
    private LocalDateTime releasedAt;
    
    @Column(name = "created_at", insertable = false, updatable = false, nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", insertable = false, updatable = false, nullable = false)
    private LocalDateTime updatedAt;

    //desisti de fazer sas prr de manytokeni
}
