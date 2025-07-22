'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const { siteContent } = useAdmin();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${siteContent.hero.backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {siteContent.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-amber-400 font-semibold mb-4">
            {siteContent.hero.subtitle}
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            {siteContent.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link href="/services" className="flex items-center space-x-2">
                <span>{siteContent.hero.ctaText}</span>
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/about" className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>{siteContent.hero.learnMoreText}</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-amber-500/20 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-blue-500/20 rounded-full animate-bounce hidden lg:block"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse hidden lg:block"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}