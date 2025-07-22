'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Settings, 
  FileText, 
  Users,
  Globe,
  Image,
  Mail,
  Phone,
  MapPin,
  Save,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Home,
  Info,
  Wrench,
  MessageSquare
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminPanel() {
  const { isAuthenticated, logout, siteContent, updateSiteContent } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('hero');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleSave = (section: string, data: any) => {
    updateSiteContent({ [section]: data });
    setSaveStatus('Changes saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">GP</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Golden Petrol Admin</h1>
                <p className="text-gray-600 text-sm">Content Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <a href="/" target="_blank" className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>View Site</span>
                </a>
              </Button>
              <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saveStatus && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{saveStatus}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hero" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Hero</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center space-x-2">
              <Info className="h-4 w-4" />
              <span>About</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Wrench className="h-4 w-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contact</span>
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Footer</span>
            </TabsTrigger>
          </TabsList>

          {/* Hero Section Management */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="h-5 w-5" />
                  <span>Hero Section</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="hero-title">Main Title</Label>
                      <Input
                        id="hero-title"
                        value={siteContent.hero.title}
                        onChange={(e) => handleSave('hero', { ...siteContent.hero, title: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle">Subtitle</Label>
                      <Input
                        id="hero-subtitle"
                        value={siteContent.hero.subtitle}
                        onChange={(e) => handleSave('hero', { ...siteContent.hero, subtitle: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-description">Description</Label>
                      <Textarea
                        id="hero-description"
                        value={siteContent.hero.description}
                        onChange={(e) => handleSave('hero', { ...siteContent.hero, description: e.target.value })}
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-image">Background Image URL</Label>
                      <Input
                        id="hero-image"
                        value={siteContent.hero.backgroundImage}
                        onChange={(e) => handleSave('hero', { ...siteContent.hero, backgroundImage: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hero-cta">CTA Button Text</Label>
                        <Input
                          id="hero-cta"
                          value={siteContent.hero.ctaText}
                          onChange={(e) => handleSave('hero', { ...siteContent.hero, ctaText: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hero-learn">Learn More Text</Label>
                        <Input
                          id="hero-learn"
                          value={siteContent.hero.learnMoreText}
                          onChange={(e) => handleSave('hero', { ...siteContent.hero, learnMoreText: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Live Preview</Label>
                    <div className="border rounded-lg overflow-hidden">
                      <div 
                        className="h-64 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${siteContent.hero.backgroundImage})` }}
                      >
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                          <div className="text-center text-white">
                            <h3 className="text-2xl font-bold mb-2">{siteContent.hero.title}</h3>
                            <p className="text-lg text-amber-400 mb-2">{siteContent.hero.subtitle}</p>
                            <p className="text-sm opacity-90 mb-4">{siteContent.hero.description.substring(0, 100)}...</p>
                            <div className="flex space-x-2 justify-center">
                              <span className="bg-blue-600 px-3 py-1 rounded text-xs">{siteContent.hero.ctaText}</span>
                              <span className="border border-white px-3 py-1 rounded text-xs">{siteContent.hero.learnMoreText}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section Management */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>About Section</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="about-title">About Title</Label>
                      <Input
                        id="about-title"
                        value={siteContent.about.title}
                        onChange={(e) => handleSave('about', { ...siteContent.about, title: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="about-subtitle">Subtitle</Label>
                      <Input
                        id="about-subtitle"
                        value={siteContent.about.subtitle}
                        onChange={(e) => handleSave('about', { ...siteContent.about, subtitle: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="about-description">Description</Label>
                      <Textarea
                        id="about-description"
                        value={siteContent.about.description}
                        onChange={(e) => handleSave('about', { ...siteContent.about, description: e.target.value })}
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="about-mission-title">Mission Title</Label>
                      <Input
                        id="about-mission-title"
                        value={siteContent.about.missionTitle}
                        onChange={(e) => handleSave('about', { ...siteContent.about, missionTitle: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="about-mission-text">Mission Text</Label>
                      <Textarea
                        id="about-mission-text"
                        value={siteContent.about.missionText}
                        onChange={(e) => handleSave('about', { ...siteContent.about, missionText: e.target.value })}
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="about-image">About Image URL</Label>
                      <Input
                        id="about-image"
                        value={siteContent.about.image}
                        onChange={(e) => handleSave('about', { ...siteContent.about, image: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Statistics</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="stats-stations">Stations</Label>
                        <Input
                          id="stats-stations"
                          value={siteContent.about.stats.stations}
                          onChange={(e) => handleSave('about', { 
                            ...siteContent.about, 
                            stats: { ...siteContent.about.stats, stations: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stats-customers">Customers</Label>
                        <Input
                          id="stats-customers"
                          value={siteContent.about.stats.customers}
                          onChange={(e) => handleSave('about', { 
                            ...siteContent.about, 
                            stats: { ...siteContent.about.stats, customers: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stats-years">Years</Label>
                        <Input
                          id="stats-years"
                          value={siteContent.about.stats.years}
                          onChange={(e) => handleSave('about', { 
                            ...siteContent.about, 
                            stats: { ...siteContent.about.stats, years: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stats-employees">Employees</Label>
                        <Input
                          id="stats-employees"
                          value={siteContent.about.stats.employees}
                          onChange={(e) => handleSave('about', { 
                            ...siteContent.about, 
                            stats: { ...siteContent.about.stats, employees: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {siteContent.services.map((service, index) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Input
                        value={service.title}
                        onChange={(e) => {
                          const updatedServices = [...siteContent.services];
                          updatedServices[index] = { ...service, title: e.target.value };
                          handleSave('services', updatedServices);
                        }}
                        className="font-bold"
                      />
                      <Switch
                        checked={service.active}
                        onCheckedChange={(checked) => {
                          const updatedServices = [...siteContent.services];
                          updatedServices[index] = { ...service, active: checked };
                          handleSave('services', updatedServices);
                        }}
                      />
                    </div>
                    <Textarea
                      value={service.description}
                      onChange={(e) => {
                        const updatedServices = [...siteContent.services];
                        updatedServices[index] = { ...service, description: e.target.value };
                        handleSave('services', updatedServices);
                      }}
                      rows={3}
                    />
                    <Input
                      value={service.image}
                      onChange={(e) => {
                        const updatedServices = [...siteContent.services];
                        updatedServices[index] = { ...service, image: e.target.value };
                        handleSave('services', updatedServices);
                      }}
                      placeholder="Image URL"
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Management */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contact-title">Contact Title</Label>
                      <Input
                        id="contact-title"
                        value={siteContent.contact.title}
                        onChange={(e) => handleSave('contact', { ...siteContent.contact, title: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-subtitle">Subtitle</Label>
                      <Input
                        id="contact-subtitle"
                        value={siteContent.contact.subtitle}
                        onChange={(e) => handleSave('contact', { ...siteContent.contact, subtitle: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-address">Address</Label>
                      <Textarea
                        id="contact-address"
                        value={siteContent.contact.address}
                        onChange={(e) => handleSave('contact', { ...siteContent.contact, address: e.target.value })}
                        rows={3}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Phone Number</Label>
                      <Input
                        id="contact-phone"
                        value={siteContent.contact.phone}
                        onChange={(e) => handleSave('contact', { ...siteContent.contact, phone: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={siteContent.contact.email}
                        onChange={(e) => handleSave('contact', { ...siteContent.contact, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-hours">Business Hours</Label>
                      <Input
                        id="contact-hours"
                        value={siteContent.contact.hours}
                        onChange={(e) => handleSave('contact', { ...siteContent.contact, hours: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-latitude">Latitude</Label>
                      <Input
                        id="contact-latitude"
                        value={siteContent.contact.latitude}
                        onChange={(e) => handleSave('contact', { ...siteContent.contact, latitude: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-longitude">Longitude</Label>
                      <Input
                        id="contact-longitude"
                        value={siteContent.contact.longitude}
                        onChange={(e) => handleSave('contact', { ...siteContent.contact, longitude: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Management */}
          <TabsContent value="footer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Footer Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="footer-description">Footer Description</Label>
                  <Textarea
                    id="footer-description"
                    value={siteContent.footer.description}
                    onChange={(e) => handleSave('footer', { ...siteContent.footer, description: e.target.value })}
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Social Media Links</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="social-facebook">Facebook</Label>
                      <Input
                        id="social-facebook"
                        value={siteContent.footer.socialLinks.facebook}
                        onChange={(e) => handleSave('footer', { 
                          ...siteContent.footer, 
                          socialLinks: { ...siteContent.footer.socialLinks, facebook: e.target.value }
                        })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="social-twitter">Twitter</Label>
                      <Input
                        id="social-twitter"
                        value={siteContent.footer.socialLinks.twitter}
                        onChange={(e) => handleSave('footer', { 
                          ...siteContent.footer, 
                          socialLinks: { ...siteContent.footer.socialLinks, twitter: e.target.value }
                        })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="social-linkedin">LinkedIn</Label>
                      <Input
                        id="social-linkedin"
                        value={siteContent.footer.socialLinks.linkedin}
                        onChange={(e) => handleSave('footer', { 
                          ...siteContent.footer, 
                          socialLinks: { ...siteContent.footer.socialLinks, linkedin: e.target.value }
                        })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="social-instagram">Instagram</Label>
                      <Input
                        id="social-instagram"
                        value={siteContent.footer.socialLinks.instagram}
                        onChange={(e) => handleSave('footer', { 
                          ...siteContent.footer, 
                          socialLinks: { ...siteContent.footer.socialLinks, instagram: e.target.value }
                        })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}