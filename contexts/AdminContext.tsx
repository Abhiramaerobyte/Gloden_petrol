'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  siteContent: SiteContent;
  updateSiteContent: (content: Partial<SiteContent>) => void;
}

interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    ctaText: string;
    learnMoreText: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    missionTitle: string;
    missionText: string;
    image: string;
    stats: {
      stations: string;
      customers: string;
      years: string;
      employees: string;
    };
  };
  services: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    image: string;
    features: string[];
    active: boolean;
  }>;
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    mapEmbed: string;
    latitude: string;
    longitude: string;
  };
  footer: {
    description: string;
    socialLinks: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
    };
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultSiteContent: SiteContent = {
  hero: {
    title: 'Golden Petrol',
    subtitle: 'Excellence in Energy Solutions',
    description: 'Leading petroleum company providing premium fuel solutions and automotive services across the region',
    backgroundImage: 'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    ctaText: 'Explore Services',
    learnMoreText: 'Learn More'
  },
  about: {
    title: 'About Golden Petrol',
    subtitle: 'Your trusted energy partner since 1995',
    description: 'Golden Petrol has been serving the community with exceptional petroleum products and services for over 25 years. We pride ourselves on quality, reliability, and customer satisfaction.',
    missionTitle: 'Our Mission',
    missionText: 'To provide the highest quality petroleum products and automotive services while maintaining environmental responsibility and community engagement.',
    image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    stats: {
      stations: '150+',
      customers: '50K+',
      years: '28+',
      employees: '500+'
    }
  },
  services: [
    {
      id: 1,
      title: 'Fuel Supply',
      description: 'Premium quality gasoline and diesel fuel for all vehicle types',
      icon: 'Fuel',
      image: 'https://images.pexels.com/photos/3846209/pexels-photo-3846209.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Premium Gasoline', 'Diesel Fuel', 'Automotive Oils', 'Additives'],
      active: true
    },
    {
      id: 2,
      title: 'Vehicle Maintenance',
      description: 'Professional automotive maintenance and repair services',
      icon: 'Wrench',
      image: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Oil Change', 'Brake Service', 'Engine Diagnostics', 'Tire Service'],
      active: true
    },
    {
      id: 3,
      title: 'Car Wash',
      description: 'Premium car washing and detailing services',
      icon: 'Car',
      image: 'https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Exterior Wash', 'Interior Cleaning', 'Waxing', 'Detailing'],
      active: true
    },
    {
      id: 4,
      title: 'Convenience Store',
      description: 'Wide range of automotive products and daily essentials',
      icon: 'ShoppingBag',
      image: 'https://images.pexels.com/photos/2292919/pexels-photo-2292919.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Snacks & Drinks', 'Automotive Products', 'Phone Cards', 'ATM Service'],
      active: true
    }
  ],
  contact: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    address: 'King Fahd Road, Riyadh, Saudi Arabia\nP.O. Box 12345',
    phone: '+966 11 123 4567',
    email: 'info@goldenpetrol.sa',
    hours: '24/7 Service Available',
    mapEmbed: '',
    latitude: '24.7136',
    longitude: '46.6753'
  },
  footer: {
    description: 'Golden Petrol - Your trusted partner for all petroleum and automotive needs.',
    socialLinks: {
      facebook: 'https://facebook.com/goldenpetrol',
      twitter: 'https://twitter.com/goldenpetrol',
      linkedin: 'https://linkedin.com/company/goldenpetrol',
      instagram: 'https://instagram.com/goldenpetrol'
    }
  }
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    // Load saved content
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        setSiteContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const updateSiteContent = (content: Partial<SiteContent>) => {
    const updatedContent = { ...siteContent, ...content };
    setSiteContent(updatedContent);
    localStorage.setItem('siteContent', JSON.stringify(updatedContent));
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      siteContent,
      updateSiteContent
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}