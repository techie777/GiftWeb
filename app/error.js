'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-rose-50 text-center font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-rose-200 max-w-lg w-full space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">
          ⚠️
        </div>
        <h2 className="text-2xl font-black text-gray-900">Something went wrong!</h2>
        <div className="bg-gray-100 p-4 rounded-xl text-left overflow-auto text-xs font-mono text-rose-700 max-h-64 whitespace-pre-wrap">
          <p className="font-bold">{error?.message || String(error)}</p>
          {error?.stack && <p className="mt-2 text-[10px] text-gray-500">{error.stack}</p>}
        </div>
        <button
          onClick={() => reset()}
          className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-rose-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
