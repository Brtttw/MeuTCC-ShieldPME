package br.com.shieldpme.api.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@Entity
@Table (name = "contract_services", schema = "dbo")
public class ContractService {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "contract_id", nullable = false)
    private Contract contract;
    
    @Column(name = "service_id", nullable = false)
    private ServiceOffering service;
    
    @Column(name = "site_id", nullable = false)
    private Site site;
    
    @Column(name = "frequency_id", nullable = false)
    private ServiceFrequency frequency;

    @Column(name = "created_at", insertable = false, updatable = false, nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", insertable = false, updatable = false, nullable = false)
    private LocalDateTime updatedAt;
}
