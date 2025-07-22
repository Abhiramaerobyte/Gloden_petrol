'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Golden Petrol',
    'hero.subtitle': 'Excellence in Energy Solutions',
    'hero.description': 'Leading petroleum company providing premium fuel solutions and automotive services across the region',
    'hero.cta': 'Explore Services',
    'hero.learn_more': 'Learn More',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive petroleum and automotive solutions',
    'services.fuel_supply': 'Fuel Supply',
    'services.fuel_supply_desc': 'Premium quality gasoline and diesel fuel for all vehicle types',
    'services.maintenance': 'Vehicle Maintenance',
    'services.maintenance_desc': 'Professional automotive maintenance and repair services',
    'services.car_wash': 'Car Wash',
    'services.car_wash_desc': 'Premium car washing and detailing services',
    'services.convenience': 'Convenience Store',
    'services.convenience_desc': 'Wide range of automotive products and daily essentials',
    
    // About
    'about.title': 'About Golden Petrol',
    'about.subtitle': 'Your trusted energy partner since 1995',
    'about.description': 'Golden Petrol has been serving the community with exceptional petroleum products and services for over 25 years. We pride ourselves on quality, reliability, and customer satisfaction.',
    'about.mission': 'Our Mission',
    'about.mission_text': 'To provide the highest quality petroleum products and automotive services while maintaining environmental responsibility and community engagement.',
    'about.stats.stations': 'Service Stations',
    'about.stats.customers': 'Happy Customers',
    'about.stats.years': 'Years of Service',
    'about.stats.employees': 'Team Members',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Business Hours',
    
    // Admin
    'admin.title': 'Admin Dashboard',
    'admin.overview': 'Overview',
    'admin.content': 'Content Management',
    'admin.analytics': 'Analytics',
    'admin.users': 'User Management',
    'admin.settings': 'Settings',
    'admin.total_sales': 'Total Sales',
    'admin.active_stations': 'Active Stations',
    'admin.monthly_customers': 'Monthly Customers',
    'admin.fuel_inventory': 'Fuel Inventory',
    
    // Footer
    'footer.description': 'Golden Petrol - Your trusted partner for all petroleum and automotive needs.',
    'footer.quick_links': 'Quick Links',
    'footer.services_links': 'Services',
    'footer.contact_info': 'Contact Information',
    'footer.rights': 'All rights reserved.',
    
    // Common
    'common.read_more': 'Read More',
    'common.get_started': 'Get Started',
    'common.learn_more': 'Learn More',
    'common.contact_us': 'Contact Us',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.contact': 'اتصل بنا',
    
    // Hero Section
    'hero.title': 'البترول الذهبي',
    'hero.subtitle': 'التميز في حلول الطاقة',
    'hero.description': 'شركة بترول رائدة تقدم حلول وقود عالية الجودة وخدمات سيارات شاملة في جميع أنحاء المنطقة',
    'hero.cta': 'استكشف خدماتنا',
    'hero.learn_more': 'اعرف المزيد',
    
    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'حلول شاملة للبترول والسيارات',
    'services.fuel_supply': 'إمداد الوقود',
    'services.fuel_supply_desc': 'بنزين وديزل عالي الجودة لجميع أنواع المركبات',
    'services.maintenance': 'صيانة المركبات',
    'services.maintenance_desc': 'خدمات صيانة وإصلاح سيارات احترافية',
    'services.car_wash': 'غسيل السيارات',
    'services.car_wash_desc': 'خدمات غسيل وتنظيف السيارات المميزة',
    'services.convenience': 'متجر الخدمات',
    'services.convenience_desc': 'مجموعة واسعة من منتجات السيارات والاحتياجات اليومية',
    
    // About
    'about.title': 'حول البترول الذهبي',
    'about.subtitle': 'شريكك الموثوق في الطاقة منذ 1995',
    'about.description': 'يخدم البترول الذهبي المجتمع بمنتجات وخدمات بترولية استثنائية لأكثر من 25 عاماً. نحن نفخر بالجودة والموثوقية ورضا العملاء.',
    'about.mission': 'رسالتنا',
    'about.mission_text': 'تقديم أعلى جودة من المنتجات البترولية والخدمات الآلية مع الحفاظ على المسؤولية البيئية والمشاركة المجتمعية.',
    'about.stats.stations': 'محطة خدمة',
    'about.stats.customers': 'عميل سعيد',
    'about.stats.years': 'سنة من الخدمة',
    'about.stats.employees': 'عضو فريق',
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'تواصل مع فريقنا',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.phone': 'رقم الهاتف',
    'contact.form.message': 'الرسالة',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.info.address': 'العنوان',
    'contact.info.phone': 'الهاتف',
    'contact.info.email': 'البريد الإلكتروني',
    'contact.info.hours': 'ساعات العمل',
    
    // Admin
    'admin.title': 'لوحة الإدارة',
    'admin.overview': 'نظرة عامة',
    'admin.content': 'إدارة المحتوى',
    'admin.analytics': 'التحليلات',
    'admin.users': 'إدارة المستخدمين',
    'admin.settings': 'الإعدادات',
    'admin.total_sales': 'إجمالي المبيعات',
    'admin.active_stations': 'المحطات النشطة',
    'admin.monthly_customers': 'العملاء الشهريون',
    'admin.fuel_inventory': 'مخزون الوقود',
    
    // Footer
    'footer.description': 'البترول الذهبي - شريكك الموثوق لجميع احتياجات البترول والسيارات.',
    'footer.quick_links': 'روابط سريعة',
    'footer.services_links': 'الخدمات',
    'footer.contact_info': 'معلومات الاتصال',
    'footer.rights': 'جميع الحقوق محفوظة.',
    
    // Common
    'common.read_more': 'اقرأ المزيد',
    'common.get_started': 'ابدأ الآن',
    'common.learn_more': 'اعرف المزيد',
    'common.contact_us': 'اتصل بنا',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
      document.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}