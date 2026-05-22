package com.shadematch.backend.repository;

import com.shadematch.backend.model.Shade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShadeRepository extends JpaRepository<Shade, Long> {
    List<Shade> findByBrand(String brand);
    List<Shade> findByBrandNot(String brand);
}