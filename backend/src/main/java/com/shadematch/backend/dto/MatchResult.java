package com.shadematch.backend.dto;

import com.shadematch.backend.model.Shade;

public class MatchResult {

    private Shade shade;
    private double similarity;

    public MatchResult(Shade shade, double similarity) {
        this.shade = shade;
        this.similarity = similarity;
    }

    public Shade getShade() {
        return shade;
    }

    public void setShade(Shade shade) {
        this.shade = shade;
    }

    public double getSimilarity() {
        return similarity;
    }

    public void setSimilarity(double similarity) {
        this.similarity = similarity;
    }
}