'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center p-6 bg-gray-100 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center space-y-4">
          <h2 className="text-2xl font-black text-rose-600">Application Error</h2>
          <pre className="bg-gray-50 p-4 rounded-xl text-left text-xs overflow-auto font-mono text-red-600">
            {error?.message || String(error)}
          </pre>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-rose-600 text-white font-bold rounded-xl text-xs uppercase"
          >
            Refresh Application
          </button>
        </div>
      </body>
    </html>
  );
}
