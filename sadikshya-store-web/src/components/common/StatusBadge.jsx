import React from 'react';

export default function StatusBadge({ status }) {
  const normalized = (status || 'Pending').toLowerCase();

  let styles = 'bg-amber-100 text-amber-800 border-amber-300';

  if (normalized.includes('shipped')) {
    styles = 'bg-blue-100 text-blue-800 border-blue-300';
  } else if (normalized.includes('delivered') || normalized.includes('completed')) {
    styles = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  } else if (normalized.includes('cancel')) {
    styles = 'bg-red-100 text-red-800 border-red-300';
  } else if (normalized.includes('processing')) {
    styles = 'bg-purple-100 text-purple-800 border-purple-300';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles}`}>
      {status || 'Pending'}
    </span>
  );
}
