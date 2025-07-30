/*
========================================
File: src/components/IconHeader.tsx
========================================
Purpose: Displays a section header with a Lucide icon.
*/
import React from 'react';
import { LucideProps } from 'lucide-react';
import * as icons from 'lucide-react';

interface IconHeaderProps {
  iconName: keyof typeof icons;
  title: string;
}

const IconHeader: React.FC<IconHeaderProps> = ({ iconName, title }) => {
  const Icon = icons[iconName] as React.FC<LucideProps>;
  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in lucide-react`);
    return null; 
  }

  return (
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 mr-3 text-cyan-400" />
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
  );
};

export default IconHeader;