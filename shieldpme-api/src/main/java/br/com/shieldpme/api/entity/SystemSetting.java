package br.com.shieldpme.api.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@Entity
@Table (name = "system_settings", schema = "dbo")
public class SystemSetting {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "setting_key", nullable = false, length = 100, unique = true)
    private String settingKey;
    
    @Column(name = "setting_value", columnDefinition = "nvarchar(max)")
    private String settingValue;
    
    @Column(name = "description", length = 255)
    private String description;
   
    @Column(name = "created_at", insertable = false, updatable = false, nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", insertable = false, updatable = false, nullable = false)
    private LocalDateTime updatedAt;
}
