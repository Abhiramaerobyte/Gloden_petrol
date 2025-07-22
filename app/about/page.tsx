'use client';

import React from 'react';
import { Target, Users, Award, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const { t } = useLanguage();
  const { siteContent } = useAdmin();

  const values = [
    {
      icon: Target,
      title: 'Quality',
      description: 'Committed to delivering the highest quality products and services'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building strong relationships with our local communities'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Continuously striving for operational excellence in all we do'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Responsible environmental practices for future generations'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
            alt="About Us"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {siteContent.about.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            {siteContent.about.subtitle}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {siteContent.about.missionTitle}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {siteContent.about.description}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {siteContent.about.missionText}
              </p>
            </div>
            <div className="relative">
              <img 
                src={siteContent.about.image}
                alt="Our Mission"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={value.title} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{siteContent.about.stats.stations}</div>
              <div className="text-blue-100 font-medium">{t('about.stats.stations')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{siteContent.about.stats.customers}</div>
              <div className="text-blue-100 font-medium">{t('about.stats.customers')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{siteContent.about.stats.years}</div>
              <div className="text-blue-100 font-medium">{t('about.stats.years')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{siteContent.about.stats.employees}</div>
              <div className="text-blue-100 font-medium">{t('about.stats.employees')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}