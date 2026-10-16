package br.com.shieldpme.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@Entity
@Table (name = "roles", schema = "dbo")
public class Role {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "name", nullable = false, unique = true, length = 35)
    private String name;
    
    @Column(name = "description", nullable = false, length = 255)
    private String description;
}

