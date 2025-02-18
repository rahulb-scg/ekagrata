"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCategories, useSiteConfig } from '../lib/hooks';
import { getImageUrl } from '../lib/utils';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { categories } = useCategories();
  const { config } = useSiteConfig();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Artisans', href: '/artisans' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              {config?.data?.attributes.seo.metaImage && (
                <Image
                  src={getImageUrl(config.data.attributes.seo.metaImage.data.attributes.url)}
                  alt={config.data.attributes.siteName}
                  width={40}
                  height={40}
                  className="h-8 w-auto"
                />
              )}
              <span className="ml-2 text-xl font-medium text-gray-900">
                {config?.data?.attributes.siteName || 'Ekagrata'}
              </span>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {config?.data?.attributes.contact.whatsapp && (
              <a
                href={`https://wa.me/${config.data.attributes.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Contact on WhatsApp
              </a>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {config?.data?.attributes.contact.whatsapp && (
            <a
              href={`https://wa.me/${config.data.attributes.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block pl-3 pr-4 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Contact on WhatsApp
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
