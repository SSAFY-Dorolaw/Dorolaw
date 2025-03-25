package com.dorolaw.request.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "accident_type")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccidentType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accident_type_id")
    private Integer accidentTypeId;

    @Column(name = "type_name", length = 50, nullable = false)
    private String typeName;
}
