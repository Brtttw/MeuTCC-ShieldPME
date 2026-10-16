package br.com.shieldpme.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@Entity
@Table (name = "sites", schema = "dbo")
public class Site {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "name", length = 100)
    private String name;
    
    @Column(name = "url", nullable = false, length = 255, unique = true)
    private String url;

    @Column(name = "backend_stack", length = 255)
    private String backendStack;

    @Column(name = "database_stack", length = 255)
    private String databaseStack;

    @Column(name = "repository_url", length = 255)
    private String repositoryUrl;

    @Column(name = "created_at", insertable = false, updatable = false, nullable = false)
    private java.time.LocalDateTime createdAt;
    
    @Column(name = "updated_at", insertable = false, updatable = false, nullable = false)
    private java.time.LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
}
