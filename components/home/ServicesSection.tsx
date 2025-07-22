'use client';

import React from 'react';
import { Fuel, Wrench, Car, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent } from '@/components/ui/card';

export default function ServicesSection() {
  const { t } = useLanguage();
  const { siteContent } = useAdmin();

  const iconMap = {
    'Fuel': Fuel,
    'Wrench': Wrench,
    'Car': Car,
    'ShoppingBag': ShoppingBag
  };

  const colorMap = {
    'Fuel': 'bg-blue-500',
    'Wrench': 'bg-amber-500',
    'Car': 'bg-green-500',
    'ShoppingBag': 'bg-purple-500'
  };

  const activeServices = siteContent.services.filter(service => service.active);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeServices.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Fuel;
            const colorClass = colorMap[service.icon as keyof typeof colorMap] || 'bg-blue-500';
            return (
              <Card 
                key={service.title} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={`absolute top-4 left-4 w-12 h-12 ${colorClass} rounded-full flex items-center justify-center`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}