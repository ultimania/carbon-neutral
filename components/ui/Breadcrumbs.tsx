"use client";
import { useSelectedLayoutSegments } from 'next/navigation';
import Link from 'next/link';

import type { JSX } from "react";

export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();

  const createBreadcrumbs = () => {
    const breadcrumbs: JSX.Element[] = [];
    let path = '';

    segments.forEach((seg, index) => {
      if (seg === '(auth)') return; // Skip (auth) segment
      path += `/${seg}`;
      const displayPath = path.replace('/(auth)', ''); // Remove (auth) from path
      breadcrumbs.push(
        <span key={index} className="flex items-center space-x-4">
          {index > 0 && <span>/</span>}
          <Link href={displayPath} className="text-primary hover:underline">
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
      {/* {segments.length > 0 && <span>/</span>} */}
      {createBreadcrumbs()}
    </nav>
  );
}