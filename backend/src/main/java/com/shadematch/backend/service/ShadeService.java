package com.shadematch.backend.service;

import com.shadematch.backend.model.Shade;
import com.shadematch.backend.repository.ShadeRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ShadeService {

    private final ShadeRepository shadeRepository;

    public ShadeService(ShadeRepository shadeRepository) {
        this.shadeRepository = shadeRepository;
    }

    public List<Shade> getShadesByBrand(String brand) {
        return shadeRepository.findByBrand(brand);
    }

    public List<String> getAllBrands() {
        return shadeRepository.findAll()
                .stream()
                .map(Shade::getBrand)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    public List<Shade> findMatches(String hex) {
        int[] target = hexToRgb(hex);

        List<Shade> allShades = shadeRepository.findAll();

        Map<String, Shade> bestPerBrand = new HashMap<>();
        Map<String, Double> bestDistance = new HashMap<>();

        for (Shade shade : allShades) {
            if (shade.getHex().equalsIgnoreCase(hex)) continue;

            double dist = colorDistance(target, hexToRgb(shade.getHex()));
            String brand = shade.getBrand();

            if (!bestDistance.containsKey(brand) || dist < bestDistance.get(brand)) {
                bestDistance.put(brand, dist);
                bestPerBrand.put(brand, shade);
            }
        }

        return bestPerBrand.values().stream()
                .sorted(Comparator.comparingDouble(s -> bestDistance.get(s.getBrand())))
                .collect(Collectors.toList());
    }

    private int[] hexToRgb(String hex) {
        String clean = hex.replace("#", "");
        return new int[]{
            Integer.parseInt(clean.substring(0, 2), 16),
            Integer.parseInt(clean.substring(2, 4), 16),
            Integer.parseInt(clean.substring(4, 6), 16)
        };
    }

    private double colorDistance(int[] a, int[] b) {
        return Math.sqrt(
            Math.pow(a[0] - b[0], 2) +
            Math.pow(a[1] - b[1], 2) +
            Math.pow(a[2] - b[2], 2)
        );
    }
}