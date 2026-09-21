import React from 'react';
import { Sparkles, Layers } from 'lucide-react';

export default function SpecTable({ details }) {
  if (!details || (typeof details !== 'object') || Object.keys(details).length === 0) {
    return (
      <div className="p-6 bg-[#f9ede7] rounded-xl border border-[#d4a359]/30 text-center text-sm text-[#624f4b]">
        Standard artisan instrument craftsmanship specifications apply.
      </div>
    );
  }

  const entries = Object.entries(details);

  return (
    <div className="overflow-hidden rounded-xl border border-[#d4a359]/30 shadow-xs bg-white">
      <div className="px-5 py-3.5 bg-[#f9ede7] border-b border-[#d4a359]/20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#80182a]">
          <Layers className="w-4 h-4 text-[#c85a32]" />
          <span>Technical & Artisan Specifications</span>
        </div>
        <span className="text-[11px] text-[#624f4b] flex items-center gap-1 font-medium">
          <Sparkles className="w-3 h-3 text-[#d4a359]" /> Verified Details
        </span>
      </div>

      <table className="min-w-full divide-y divide-[#d4a359]/20 text-sm">
        <tbody className="divide-y divide-[#d4a359]/10">
          {entries.map(([key, val], idx) => (
            <tr 
              key={key} 
              className={idx % 2 === 0 ? 'bg-[#fff8f5]' : 'bg-white hover:bg-[#f9ede7]/50 transition-colors'}
            >
              <td className="px-5 py-3 text-xs font-semibold text-[#80182a] uppercase tracking-wide w-1/3 border-r border-[#d4a359]/15">
                {key}
              </td>
              <td className="px-5 py-3 text-sm text-[#1f1412] font-medium">
                {typeof val === 'object' ? JSON.stringify(val) : String(val)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
