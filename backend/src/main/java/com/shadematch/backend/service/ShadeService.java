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
        double[] target = rgbToLab(hexToRgb(hex));

        List<Shade> allShades = shadeRepository.findAll();

        Map<String, Shade> bestPerBrand = new HashMap<>();
        Map<String, Double> bestDistance = new HashMap<>();

        for (Shade shade : allShades) {
            if (shade.getHex() == null || shade.getHex().isBlank()) continue;
            if (shade.getHex().equalsIgnoreCase(hex)) continue;

            try {
                double dist = deltaE(target, rgbToLab(hexToRgb(shade.getHex())));
                String brand = shade.getBrand();

                if (!bestDistance.containsKey(brand) || dist < bestDistance.get(brand)) {
                    bestDistance.put(brand, dist);
                    bestPerBrand.put(brand, shade);
                }
            } catch (Exception e) {
                continue;
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

    private double[] rgbToLab(int[] rgb) {
        // Step 1: RGB to XYZ
        double r = rgb[0] / 255.0;
        double g = rgb[1] / 255.0;
        double b = rgb[2] / 255.0;

        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

        double x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
        double y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
        double z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

        // Step 2: XYZ to Lab
        x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x) + (16.0 / 116.0);
        y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y) + (16.0 / 116.0);
        z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z) + (16.0 / 116.0);

        return new double[]{
            (116.0 * y) - 16.0,  // L
            500.0 * (x - y),      // a
            200.0 * (y - z)       // b
        };
    }

    private double deltaE(double[] lab1, double[] lab2) {
        return Math.sqrt(
            Math.pow(lab1[0] - lab2[0], 2) +
            Math.pow(lab1[1] - lab2[1], 2) +
            Math.pow(lab1[2] - lab2[2], 2)
        );
    }
}