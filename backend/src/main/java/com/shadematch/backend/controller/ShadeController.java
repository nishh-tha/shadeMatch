package com.shadematch.backend.controller;

import com.shadematch.backend.model.Shade;
import com.shadematch.backend.service.ShadeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ShadeController {

    private final ShadeService shadeService;

    public ShadeController(ShadeService shadeService) {
        this.shadeService = shadeService;
    }

    @GetMapping("/brands")
    public List<String> getBrands() {
        return shadeService.getAllBrands();
    }

    @GetMapping("/shades")
    public List<Shade> getShadesByBrand(@RequestParam String brand) {
        return shadeService.getShadesByBrand(brand);
    }

    @GetMapping("/match")
    public List<Shade> getMatches(@RequestParam String hex) {
        return shadeService.findMatches(hex);
    }
}