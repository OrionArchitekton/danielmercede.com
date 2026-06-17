import React from 'react';
import { Biography } from './components/Biography';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex justify-center py-12 px-6 sm:px-8 md:py-24 print:block print:h-auto print:p-0 print:w-full">
      {/* Skip-to-content link: visually hidden until focused (a11y parity, W15). */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded print:hidden"
      >
        Skip to content
      </a>
      <main id="main-content" tabIndex={-1} className="w-full max-w-2xl mx-auto outline-none print:max-w-none">
        <Biography />
      </main>
    </div>
  );
};

export default App;