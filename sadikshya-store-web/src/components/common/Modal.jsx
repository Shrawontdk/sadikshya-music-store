import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className={`bg-[#fff8f5] rounded-2xl shadow-2xl border border-[#d4a359]/40 w-full ${maxWidth} overflow-hidden transform transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#d4a359]/20 bg-[#f9ede7] flex items-center justify-between">
          <h3 className="font-heritage text-lg font-bold text-[#80182a]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#624f4b] hover:text-[#80182a] hover:bg-[#fff8f5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
