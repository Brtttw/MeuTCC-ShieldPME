package br.com.shieldpme.api.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@Entity
@Table (name = "execution_assignments", schema = "dbo")
public class ExecutionAssignment {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "service_execution_id", nullable = false, unique = true)
    private ServiceExecution serviceExecution;

    @Column(name = "employee_id", nullable = false, unique = true)
    private Employee employee;

    @Column(name = "assigned_at", nullable = false)
    private LocalDateTime assignedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "is_lead", nullable = false)
    private boolean isLead;

    //sla dnv oq coloca na cardinalidade
}
