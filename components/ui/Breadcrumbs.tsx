"use client";

import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumbs() {
  const segment = useSelectedLayoutSegment();
  const segments = segment ? segment.split('/') : [];

  const createBreadcrumbs = () => {
    const breadcrumbs: JSX.Element[] = [];
    let path = '';

    segments.forEach((seg, index) => {
      path += `/${seg}`;
      breadcrumbs.push(
        <span key={index} className="flex items-center space-x-4">
          {index > 0 && <span>/</span>}
          <Link href={path} className="text-primary hover:underline">
            {seg.charAt(0).toUpperCase() + seg.slice(1)}
          </Link>
        </span>
      );
    });

    return breadcrumbs;
  };

  return (
    <nav className="flex items-center space-x-4">
      <Link href="/" className="text-primary hover:underline">
        Home
      </Link>
      {segments.length > 0 && <span>/</span>}
      {createBreadcrumbs()}
    </nav>
  );
};