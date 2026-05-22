package com.shadematch.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "shades")
public class Shade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String brandShort;
    private String product;
    private String productShort;
    private String name;
    private String hex;
    private Double hue;
    private Double saturation;
    private Double lightness;

    @Column(name = "country_group")
    private Integer countryGroup;
}