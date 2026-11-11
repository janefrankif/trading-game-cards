const fs = require('fs');

let pageContent = fs.readFileSync('app/page.tsx', 'utf8');

// Add import for useRouter, useSearchParams
if (!pageContent.includes('useRouter')) {
    pageContent = pageContent.replace(
        "import React, { useState, useEffect, useMemo } from 'react';",
        "import React, { useState, useEffect, useMemo, Suspense } from 'react';\nimport { useRouter, useSearchParams } from 'next/navigation';"
    );
}

// Replace the hook setup and navigation logic
// Wait, we need to create a wrapper for useSearchParams if we use Suspense, or just use useRouter.
// Let's just remove the manual url logic and only use state for now, without touching the URL, to see if that fixes it.
// Actually, it's better to just use Next.js useRouter.

// Let's look at the navigation part.
const navLogicRegex = /const handleNavigate = \(pageId: string\) => {[\s\S]*?};\n/m;
const newNavLogic = `  const handleNavigate = (pageId: string) => {
    setActiveSection(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };\n`;

pageContent = pageContent.replace(navLogicRegex, newNavLogic);

// We should also disable the URL listening for now to prevent interference.
const urlEffectRegex = /\/\/ Sync with URL query parameter[\s\S]*?return \(\) => window\.removeEventListener\('popstate', handleUrlChange\);\n  \}, \[\]\);\n/m;
pageContent = pageContent.replace(urlEffectRegex, '');

fs.writeFileSync('app/page.tsx', pageContent, 'utf8');
console.log('Fixed navigation');
