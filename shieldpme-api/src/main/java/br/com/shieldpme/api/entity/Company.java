package br.com.shieldpme.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
@Entity 
@Table (name = "companies", schema = "dbo")
public class Company {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "name", nullable = false, length = 150)
    private String name;
    
    @Pattern(regexp = "\\d{14}", message = "O CNPJ deve conter exatamente 14 dígitos")
    @Column(name = "cnpj", nullable = false, length = 14, columnDefinition = "CHAR(14)", unique = true)
    private String cnpj;
    
    @Column(name = "created_at", insertable = false, updatable = false)
    private java.time.LocalDateTime createdAt;
    
    @Column(name = "updated_at", insertable = false, updatable = false)
    private java.time.LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
