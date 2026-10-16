package br.com.shieldpme.api.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@Entity
@Table (name = "service_frequencies", schema = "dbo")
public class ServiceFrequency {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "name", nullable = false, unique = true, length = 20)
    private String name;

    @Column(name = "interval_value", nullable = false, columnDefinition = "SMALLINT", unique = true)
    private Integer intervalValue;

    @Column(name = "interval_unit", nullable = false, length = 10, unique = true)
    private String intervalUnit;

    @Column(name = "created_at", insertable = false, updatable = false, nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", insertable = false, updatable = false, nullable = false)
    private LocalDateTime updatedAt;
    
}
