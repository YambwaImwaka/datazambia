
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  type?: string;
}

export const SEOHead = ({
  title = "Data Zambia - Provincial Analytics Dashboard",
  description = "Comprehensive analytics and information about Zambian provinces, economic indicators, and financial data.",
  image = "/lovable-uploads/2f245af2-a159-479f-b943-399b757e847a.png",
  canonicalUrl = "https://datazambia.com",
  type = "website"
}: SEOHeadProps) => {
  const fullTitle = title.includes("Data Zambia") ? title : `${title} | Data Zambia`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};
