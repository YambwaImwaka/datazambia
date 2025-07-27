-- Create pages table for CMS functionality
-- Run this script in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author TEXT NOT NULL,
  meta_description TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view published pages" 
  ON public.pages 
  FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Admins can manage all pages" 
  ON public.pages 
  FOR ALL 
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON public.pages(status);
CREATE INDEX IF NOT EXISTS idx_pages_created_at ON public.pages(created_at);

-- Insert some sample pages
INSERT INTO public.pages (title, slug, content, status, author, meta_description, tags) VALUES
(
  'About Data Zambia',
  'about',
  '# About Data Zambia

Data Zambia is a comprehensive platform dedicated to providing transparent access to Zambia''s public data and statistics. Our mission is to empower citizens, researchers, and policymakers with reliable, up-to-date information about our nation.

## Our Mission

We believe that data transparency is fundamental to democracy and good governance. By making public data easily accessible and understandable, we help citizens make informed decisions and hold government accountable.

## What We Offer

- **Economic Data**: GDP, inflation, trade statistics, and financial indicators
- **Social Statistics**: Population demographics, education, health, and social welfare data
- **Infrastructure**: Information about roads, utilities, and public services
- **Government Performance**: Budget allocations, project tracking, and service delivery metrics
- **Interactive Visualizations**: Charts, maps, and dashboards to explore data
- **Downloadable Reports**: PDF and Excel formats for offline analysis

## Data Sources

Our data comes from official government sources including:
- Central Statistical Office (CSO)
- Bank of Zambia (BoZ)
- Ministry of Finance
- Various government ministries and departments

## Contact Us

For questions, suggestions, or to report data issues, please contact us at info@datazambia.com

*Last updated: January 2024*',
  'published',
  'admin',
  'Learn about Data Zambia - your source for transparent access to Zambia''s public data and statistics.',
  ARRAY['about', 'data', 'zambia', 'transparency']
),
(
  'Contact Us',
  'contact',
  '# Contact Data Zambia

We welcome your feedback, questions, and suggestions. Here are the different ways you can reach us:

## General Inquiries

**Email**: info@datazambia.com  
**Phone**: +260 211 123456  
**Address**: 123 Independence Avenue, Lusaka, Zambia

## Technical Support

For technical issues, bugs, or feature requests:
**Email**: support@datazambia.com

## Data Requests

If you need specific data that isn''t currently available on our platform:
**Email**: data@datazambia.com

## Media Inquiries

For press releases, interviews, or media partnerships:
**Email**: media@datazambia.com

## Office Hours

Monday - Friday: 8:00 AM - 5:00 PM (CAT)  
Saturday: 9:00 AM - 1:00 PM (CAT)  
Sunday: Closed

## Social Media

- **Twitter**: @DataZambia
- **Facebook**: /DataZambia
- **LinkedIn**: /company/data-zambia

## Report Issues

Found an error in our data or website? Please report it to us with as much detail as possible so we can investigate and fix it promptly.

*We aim to respond to all inquiries within 24 hours during business days.*',
  'published',
  'admin',
  'Contact Data Zambia for questions, feedback, or technical support.',
  ARRAY['contact', 'support', 'help', 'feedback']
),
(
  'Privacy Policy',
  'privacy',
  '# Privacy Policy

**Last updated: January 2024**

## Introduction

Data Zambia ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.

## Information We Collect

### Personal Information
- Name and email address (when you register or contact us)
- Usage data and analytics
- IP address and browser information

### Non-Personal Information
- Aggregated statistics and usage patterns
- Public data that we display on our platform

## How We Use Your Information

- To provide and maintain our services
- To improve our website and user experience
- To communicate with you about updates and changes
- To analyze usage patterns and trends
- To ensure security and prevent fraud

## Data Sharing

We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:

- With your explicit consent
- To comply with legal obligations
- To protect our rights and safety
- With service providers who assist in our operations

## Data Security

We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate information
- Request deletion of your data
- Opt-out of communications
- Lodge a complaint with relevant authorities

## Cookies

We use cookies to improve your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.

## Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.

## Contact Us

If you have questions about this Privacy Policy, please contact us at privacy@datazambia.com',
  'published',
  'admin',
  'Data Zambia Privacy Policy - Learn how we protect your privacy and handle your data.',
  ARRAY['privacy', 'policy', 'data protection', 'cookies']
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_pages_updated_at 
    BEFORE UPDATE ON public.pages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 