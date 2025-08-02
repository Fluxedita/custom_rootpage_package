'use client';

import { useState } from 'react';
import { HeroSection } from '@/app/custom_pages/components/sections/HeroSection';
import { FeatureSection } from '@/app/custom_pages/components/sections/FeatureSection';
import { CTASection } from '@/app/custom_pages/components/sections/CTASection';
import { TextSection } from '@/app/custom_pages/components/sections/TextSection';
import { TwoColumnTextSection } from '@/app/custom_pages/components/sections/TwoColumnTextSection';
import { GallerySection } from '@/app/custom_pages/components/sections/GallerySection';
import { QuoteSection } from '@/app/custom_pages/components/sections/QuoteSection';
import { DividerSection } from '@/app/custom_pages/components/sections/DividerSection';
import { FooterSection } from '@/app/custom_pages/components/sections/FooterSection';

// Import types
import { Section } from '@/types/sections';

// Define specific section types based on the actual component props
type HeroSectionData = {
  id: string;
  type: 'hero';
  title: string;
  description: string;
  backgroundImage?: string;
  enableSpeech: boolean;
  enableTitleSpeech: boolean;
  enableDescriptionSpeech: boolean;
  textVerticalAlign?: 'top' | 'middle' | 'bottom';
  textHorizontalAlign?: 'left' | 'center' | 'right';
  layout: 'full' | 'contained';
  height: string;
  overlayColor: string;
  textColor: string;
  buttonText: string;
  buttonUrl: string;
  buttonVariant: string;
  buttonSize: string;
  enableButtonSpeech: boolean;
  customClasses: string;
};

type FeatureSectionData = {
  id: string;
  type: 'feature';
  title: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  enableSpeech: boolean;
  enableTitleSpeech: boolean;
  enableDescriptionSpeech: boolean;
  enableFeatureSpeech: boolean;
  columns: number;
  textColor: string;
  backgroundColor: string;
  customClasses: string;
  layout: string;
};

type TextSectionData = {
  id: string;
  type: 'text';
  title: string;
  content: string;
  enableSpeech: boolean;
  alignment: string;
  fontSize: string;
  fontColor: string;
  backgroundColor: string;
  padding: string;
  margin: string;
  customClasses: string;
};

type TwoColumnTextSectionData = {
  id: string;
  type: 'twoColumnText';
  title: string;
  description: string;
  leftColumn: {
    content: string;
    enableSpeech: boolean;
  };
  rightColumn: {
    content: string;
    enableSpeech: boolean;
  };
  enableLeftColumnSpeech: boolean;
  enableRightColumnSpeech: boolean;
  backgroundColor: string;
  textColor: string;
  padding: string;
  margin: string;
  customClasses: string;
};

type QuoteSectionData = {
  id: string;
  type: 'quote';
  text: string;
  author: string;
  role: string;
  enableSpeech: boolean;
  alignment: string;
  fontSize: string;
  fontColor: string;
  backgroundColor: string;
  padding: string;
  margin: string;
  customClasses: string;
};

type CTASectionData = {
  id: string;
  type: 'cta';
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  enableSpeech: boolean;
  backgroundColor: string;
  textColor: string;
  enableTitleSpeech: boolean;
  enableDescriptionSpeech: boolean;
  buttonVariant: string;
  buttonSize: string;
  customClasses: string;
};

type GallerySectionData = {
  id: string;
  type: 'gallery';
  title: string;
  description: string;
  layout: string;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    caption: string;
    enableSpeech: boolean;
  }>;
  enableSpeech: boolean;
  enableTitleSpeech: boolean;
  enableDescriptionSpeech: boolean;
  enableImageSpeech: boolean;
  columns: number;
  imageSize: string;
  showCaptions: boolean;
  showThumbnails: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  backgroundColor: string;
  textColor: string;
  padding: string;
  margin: string;
  customClasses: string;
};

type DividerSectionData = {
  id: string;
  type: 'divider';
  height: string;
  width: string;
  color: string;
  thickness: string;
  marginTop: string;
  marginBottom: string;
  style: string;
  enableSpeech: boolean;
};

type FooterSectionData = {
  id: string;
  type: 'footer';
  title: string;
  description: string;
  numColumns: number;
  columns: Array<{
    type: 'text';
    title: string;
    content: string;
    enableSpeech: boolean;
  }>;
  backgroundColor: string;
  textColor: string;
  padding: string;
  margin: string;
  enableSpeech: boolean;
  copyrightText: string;
  customClasses: string;
};

type HeroSectionType = Section & {
  type: 'hero' | 'new_hero';
  title: string;
  description: string;
  backgroundImage?: string;
  enableSpeech: boolean;
  enableTitleSpeech: boolean;
  enableDescriptionSpeech: boolean;
  textVerticalAlign?: 'top' | 'middle' | 'bottom';
  textHorizontalAlign?: 'left' | 'center' | 'right';
};

type FeatureSectionType = Section & {
  type: 'feature';
  title: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  enableSpeech: boolean;
};

type CTASectionType = Section & {
  type: 'cta';
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  enableSpeech: boolean;
};

type TextSectionType = Section & {
  type: 'text';
  title: string;
  content: string;
  enableSpeech: boolean;
};

type TwoColumnTextSectionType = Section & {
  type: 'twoColumnText';
  leftContent: string;
  rightContent: string;
  enableSpeech: boolean;
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  padding: string;
  margin: string;
  customClasses: string;
};

type GallerySectionType = Section & {
  type: 'gallery';
  slides: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    title?: string;
    description?: string;
  }>;
  enableSpeech: boolean;
  title: string;
  autoplay: boolean;
  autoplayDelay: number;
  showNavigation: boolean;
  showPagination: boolean;
  effect: string;
  loop: boolean;
  height: string;
  width: string;
  enableTitleSpeech: boolean;
  enableDescriptionSpeech: boolean;
};

type QuoteSectionType = Section & {
  type: 'quote';
  quote: string;
  author: string;
  role: string;
  enableSpeech: boolean;
};

type DividerSectionType = Section & {
  type: 'divider';
  height: string;
  width: string;
  color: string;
  thickness: string;
  marginTop: string;
  marginBottom: string;
  style: string;
  enableSpeech: boolean;
};

type FooterSectionType = Section & {
  type: 'footer';
  numColumns: number;
  columns: Array<{
    type: 'text';
    title: string;
    content: string;
    enableSpeech: boolean;
  }>;
  backgroundColor: string;
  textColor: string;
  padding: string;
  copyrightText: string;
};

// Initialize default footer columns
const defaultFooterColumns = [
  {
    type: 'text' as const,
    title: 'About Us',
    content: 'Your company description goes here.',
    enableSpeech: false
  },
  {
    type: 'text' as const,
    title: 'Quick Links',
    content: '• Home\n• About\n• Services\n• Contact',
    enableSpeech: false
  },
  {
    type: 'text' as const,
    title: 'Contact',
    content: 'Email: info@example.com\nPhone: (123) 456-7890\nAddress: 123 Main St',
    enableSpeech: false
  }
];

// Define section data
const heroSectionData: HeroSectionType = {
  id: 'demo-hero',
  type: 'hero',
  title: 'Welcome to Our Demo',
  description: 'This is a demonstration of the Hero Section component.',
  backgroundImage: 'https://via.placeholder.com/1920x1080',
  enableSpeech: true,
  enableTitleSpeech: true,
  enableDescriptionSpeech: true,
  textVerticalAlign: 'middle',
  textHorizontalAlign: 'center',
  layout: 'full',
  height: '500px',
  overlayColor: 'rgba(0,0,0,0.5)',
  textColor: '#ffffff',
  buttonText: 'Learn More',
  buttonUrl: '#',
  buttonVariant: 'primary',
  buttonSize: 'lg',
  enableButtonSpeech: true,
  customClasses: ''
};

const featureSectionData: FeatureSectionType = {
  id: 'demo-features',
  type: 'feature',
  title: 'Our Features',
  description: 'Check out these amazing features',
  layout: 'grid',
  features: [
    {
      title: 'Feature 1',
      description: 'Description for feature 1',
      icon: 'star'
    },
    {
      title: 'Feature 2',
      description: 'Description for feature 2',
      icon: 'check'
    },
    {
      title: 'Feature 3',
      description: 'Description for feature 3',
      icon: 'bolt'
    }
  ],
  enableSpeech: true,
  enableTitleSpeech: true,
  enableDescriptionSpeech: true,
  enableFeatureSpeech: true,
  columns: 3,
  textColor: '#333333',
  backgroundColor: '#ffffff',
  customClasses: ''
};

const textSectionData: TextSectionType = {
  id: 'demo-text',
  type: 'text',
  title: 'About Us',
  content: '<p>This is a sample text section. You can add any HTML content here.</p>',
  enableSpeech: true,
  alignment: 'left',
  fontSize: '16px',
  fontColor: '#333333',
  backgroundColor: '#ffffff',
  padding: '2rem',
  margin: '0',
  customClasses: ''
};

const twoColumnTextSectionData: TwoColumnTextSectionType = {
  id: 'demo-two-col',
  type: 'twoColumnText',
  title: 'Two Column Text',
  description: 'A section with two columns of text',
  leftContent: '<p>Left column content goes here. You can add any HTML content that will be rendered in the left column.</p>',
  rightContent: '<p>Right column content goes here. This is great for comparing features or showing related content side by side.</p>',
  enableSpeech: true,
  enableLeftColumnSpeech: true,
  enableRightColumnSpeech: true,
  backgroundColor: '#ffffff',
  textColor: '#000000',
  padding: '2rem 0',
  margin: '0',
  customClasses: ''
};

const quoteSectionData: QuoteSectionType = {
  id: 'demo-quote',
  type: 'quote',
  quote: 'This is an inspiring quote that will capture attention.',
  author: 'John Doe',
  role: 'CEO, Company Inc.',
  enableSpeech: true,
  alignment: 'center',
  fontSize: '24px',
  fontColor: '#333333',
  backgroundColor: '#f8f9fa',
  padding: '2rem',
  margin: '0',
  customClasses: ''
};

const ctaSectionData: CTASectionType = {
  id: 'demo-cta',
  type: 'cta',
  title: 'Ready to get started?',
  description: 'Sign up now to get access to all features.',
  buttonText: 'Sign Up',
  buttonUrl: '/signup',
  enableSpeech: false,
  enableTitleSpeech: true,
  enableDescriptionSpeech: true,
  backgroundColor: '#ffffff',
  textColor: '#333333',
  buttonVariant: 'primary',
  buttonSize: 'lg',
  customClasses: ''
};

const gallerySectionData: GallerySectionType = {
  id: 'demo-gallery',
  type: 'gallery',
  title: 'Our Gallery',
  slides: [],
  autoplay: false,
  autoplayDelay: 3000,
  showNavigation: true,
  showPagination: true,
  effect: 'slide',
  loop: true,
  height: '400px',
  width: '100%',
  enableSpeech: false,
  enableTitleSpeech: false,
  enableDescriptionSpeech: false
};

const dividerSectionData: DividerSectionType = {
  id: 'demo-divider',
  type: 'divider',
  height: '1px',
  width: '100%',
  color: '#333333',
  thickness: '1px',
  marginTop: '2rem',
  marginBottom: '2rem',
  style: 'solid',
  enableSpeech: false
};

const footerSectionData: FooterSectionType = {
  id: 'demo-footer',
  type: 'footer',
  title: 'Footer',
  description: 'This is the footer section.',
  numColumns: 3,
  columns: [
    {
      type: 'text',
      title: 'Column 1',
      content: '<p>This is the content of column 1.</p>',
      enableSpeech: true
    },
    {
      type: 'text',
      title: 'Column 2',
      content: '<p>This is the content of column 2.</p>',
      enableSpeech: true
    },
    {
      type: 'text',
      title: 'Column 3',
      content: '<p>This is the content of column 3.</p>',
      enableSpeech: true
    }
  ],
  backgroundColor: '#333333',
  textColor: '#ffffff',
  padding: '2rem',
  copyrightText: '2023 Company Inc.',
  customClasses: ''
};

// Common props for all sections
const commonSectionProps = {
  isEditMode: false,
  onSectionChange: (section: any) => console.log('Section updated:', section),
  speakText: (text: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
  },
};

export default function SectionsDemo() {
  // State for edit mode
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  
  // State for each section's data
  const [activeSections, setActiveSections] = useState<{[key: string]: any}>({});

  // Update section data
  const handleSectionChange = (sectionId: string, updates: any) => {
    setActiveSections(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], ...updates }
    }));
  };

  // Get section data with fallback to default data
  const getSectionData = (sectionId: string, defaultData: any) => {
    return activeSections[sectionId] || defaultData;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sections Demo</h1>
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-4 py-2 rounded-md ${
            isEditMode 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          {isEditMode ? 'Exit Edit Mode' : 'Edit Mode'}
        </button>
      </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {isEditMode ? 'Edit Mode' : 'Preview Mode'}
          </span>
        </div>
      </div>
      
      {/* Footer Section */}
      <section className="mb-16 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Footer Section</h2>
        <div className="bg-gray-50 p-6 rounded border border-gray-200">
          <FooterSection 
            section={{
              id: 'demo-footer',
              type: 'footer',
              numColumns: 3,
              columns: [
                {
                  type: 'text',
                  title: 'About Us',
                  content: 'Your company description goes here.',
                  enableSpeech: false
                },
                {
                  type: 'text',
                  title: 'Quick Links',
                  content: '• Home\n• About\n• Services\n• Contact',
                  enableSpeech: false
                },
                {
                  type: 'text',
                  title: 'Contact',
                  content: 'Email: info@example.com\nPhone: (123) 456-7890\nAddress: 123 Main St',
                  enableSpeech: false
                }
              ],
              backgroundColor: '#1a1a1a',
              textColor: '#f8f9fa',
              padding: '2rem 1rem',
            }}
            isEditMode={isEditMode}
            onSectionChange={(updates) => console.log('Footer updated:', updates)}
            speakText={(text) => {
              if ('speechSynthesis' in window) {
                const speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech);
              }
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Call to Action</h2>
        <div className="bg-gray-50 p-6 rounded border border-gray-200">
          <CTASection 
            section={{
              visible: true,
              id: 'demo-cta',
              type: 'cta',
              title: 'Ready to get started?',
              description: 'Sign up today and experience the difference.',
              buttonText: 'Get Started',
              buttonUrl: '#',
              backgroundColor: '#007bff',
              textColor: '#ffffff',
              enableSpeech: true,
              enableTitleSpeech: true,
              enableDescriptionSpeech: true,
            }}
            isEditMode={isEditMode}
            onSectionChange={(updates) => console.log('CTA updated:', updates)}
            speakText={(text) => {
              if ('speechSynthesis' in window) {
                const speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech);
              }
            }}
          />
        </div>
      </section>

      <section className="mb-16 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Gallery</h2>
        <div className="bg-gray-50 p-6 rounded border border-gray-200">
          <GallerySection
            isEditMode={isEditMode}
            onSectionChange={(updates) => console.log('Gallery updated:', updates)}
            speakText={(text) => {
              if ('speechSynthesis' in window) {
                const speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech);
              }
            }} 
            section={{
              ...getSectionData('gallery', gallerySectionData),
              description: 'A collection of images',
              images: gallerySectionData.slides.map(slide => ({
                id: slide.id,
                url: slide.url,
                alt: slide.title || 'Gallery image',
                caption: slide.description || '',
                enableSpeech: true,
              })),
              layout: 'grid',
              enableImageSpeech: true,
            }}
          />
        </div>
      </section>

      <section className="mb-16 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Divider</h2>
        <div className="bg-gray-50 p-6 rounded border border-gray-200">
          <DividerSection 
            idx={0}
            renderSectionControls={() => (
              <div className="p-2 bg-white border border-gray-200 rounded shadow-sm">
                <div className="text-sm text-gray-600">Divider Controls</div>
              </div>
            )}
            section={{
              ...getSectionData('divider', dividerSectionData),
              margin: '2rem 0',
              alignment: 'center',
            }}
            isEditMode={isEditMode}
            onSectionChange={(updates) => console.log('Divider updated:', updates)}
          />
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Footer</h2>
          <div className="bg-gray-50 p-6 rounded border border-gray-200">
            <FooterSection 
              section={{
                ...getSectionData('footer', footerSectionData),
                enableSpeech: true,
              }}
              isEditMode={isEditMode}
              onSectionChange={(updates) => console.log('Footer updated:', updates)}
              speakText={(text) => {
                if ('speechSynthesis' in window) {
                  const speech = new SpeechSynthesisUtterance(text);
                  window.speechSynthesis.speak(speech);
                }
              }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
