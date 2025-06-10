
import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import KeyMetrics from "@/components/home/KeyMetrics";
import DataHighlights from "@/components/home/DataHighlights";
import DataVisualizer from "@/components/home/DataVisualizer";
import FeaturedProvinces from "@/components/home/FeaturedProvinces";
import SectorTiles from "@/components/home/SectorTiles";
import FeaturedInsights from "@/components/home/FeaturedInsights";
import NewsHighlights from "@/components/home/NewsHighlights";
import EmailSignup from "@/components/home/EmailSignup";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Key Metrics */}
        <KeyMetrics />
        
        {/* Data Highlights */}
        <DataHighlights />
        
        {/* Data Visualizer */}
        <DataVisualizer />
        
        {/* Featured Provinces */}
        <FeaturedProvinces />
        
        {/* Sector Tiles */}
        <SectorTiles />
        
        {/* Featured Insights */}
        <FeaturedInsights />
        
        {/* News Highlights */}
        <NewsHighlights />
        
        {/* Email Signup */}
        <EmailSignup />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
