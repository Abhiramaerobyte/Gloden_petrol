'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';

export default function StatsSection() {
  const { t } = useLanguage();
  const { siteContent } = useAdmin();

  const stats = [
    {
      number: siteContent.about.stats.stations,
      label: t('about.stats.stations'),
    },
    {
      number: siteContent.about.stats.customers,
      label: t('about.stats.customers'),
    },
    {
      number: siteContent.about.stats.years,
      label: t('about.stats.years'),
    },
    {
      number: siteContent.about.stats.employees,
      label: t('about.stats.employees'),
    }
  ];

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-blue-100 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}