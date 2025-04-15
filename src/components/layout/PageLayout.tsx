
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { SEOHead } from './SEOHead';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  bgColor?: string;
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  type?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  fullWidth = false,
  showHeader = true,
  showFooter = true,
  bgColor = 'bg-gray-50 dark:bg-gray-900',
  title,
  description,
  image,
  canonicalUrl,
  type,
}) => {
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        image={image}
        canonicalUrl={canonicalUrl}
        type={type}
      />
      
      <div className="min-h-screen flex flex-col">
        {showHeader && <Header />}
        
        <main className={cn("flex-grow py-4 md:py-12", bgColor)}>
          <div className={cn(
            fullWidth ? 'container-fluid px-3 md:px-4' : 'container mx-auto px-3 md:px-4',
            'pt-20 md:pt-20',
            className
          )}>
            {children}
          </div>
        </main>
        
        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default PageLayout;
