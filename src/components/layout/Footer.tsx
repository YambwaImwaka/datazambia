
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const isMobile = useIsMobile();

  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Explore',
      links: [
        { name: 'Provinces', href: '/provinces' },
        { name: 'Data Explorer', href: '/explore' },
        { name: 'Agriculture', href: '/explore/agriculture' },
        { name: 'Economy', href: '/explore/economy' },
        { name: 'Health', href: '/explore/health' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Open Data', href: '/data' },
        { name: 'API Access', href: '/api' },
        { name: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Press', href: '/press' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Data Policy', href: '/data-policy' },
        { name: 'Cookies', href: '/cookies' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Github', icon: <Github className="h-5 w-5" />, href: 'https://github.com' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com' },
    { name: 'Mail', icon: <Mail className="h-5 w-5" />, href: 'mailto:info@zambiainsight.com' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="bg-zambia-600 text-white font-bold text-xl px-2 py-1 rounded">ZI</span>
              <span className="font-bold text-lg">Zambia Insight</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
              Providing comprehensive data visualization and insights for Zambia's provinces to support informed decision-making.
            </p>
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-zambia-600 dark:text-gray-400 dark:hover:text-zambia-400 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {!isMobile ? (
            // Desktop footer layout
            <>
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-sm text-gray-600 hover:text-zambia-600 dark:text-gray-400 dark:hover:text-zambia-400 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            // Mobile footer layout (simplified)
            <div className="grid grid-cols-2 gap-8">
              {footerSections.slice(0, 2).map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.slice(0, 3).map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-sm text-gray-600 hover:text-zambia-600 dark:text-gray-400 dark:hover:text-zambia-400 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} Zambia Insight. All rights reserved.
            </p>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <a
                href="https://data.gov.zm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-zambia-600 dark:text-gray-400 dark:hover:text-zambia-400 transition-colors flex items-center mr-4"
              >
                <span>Data Source</span>
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
              <a
                href="https://github.com/zambia-insight"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-zambia-600 dark:text-gray-400 dark:hover:text-zambia-400 transition-colors flex items-center"
              >
                <span>Open Source</span>
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
