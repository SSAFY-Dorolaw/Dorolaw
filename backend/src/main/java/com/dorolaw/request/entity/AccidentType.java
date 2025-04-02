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
    private Integer accidentTypeId;

    @Column(length = 50, nullable = false)
    private String typeName;
}
