/*
========================================
File: src/components/WhitepaperModal.tsx
========================================
Purpose: A modal dialog component to display the generated whitepaper.
*/
import React from 'react';
import { FileText, X } from 'lucide-react';
import Card from './Card';

interface WhitepaperModalProps {
  content: string;
  onClose: () => void;
}

const WhitepaperModal: React.FC<WhitepaperModalProps> = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className="flex items-center mb-6">
          <FileText className="w-8 h-8 mr-4 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Generated Policy Whitepaper</h2>
        </div>
        <div className="prose prose-invert prose-sm md:prose-base max-w-none text-gray-300 whitespace-pre-wrap font-mono bg-gray-900/70 p-6 rounded-lg border border-gray-700">
          {content}
        </div>
      </Card>
    </div>
  );
};

export default WhitepaperModal;
