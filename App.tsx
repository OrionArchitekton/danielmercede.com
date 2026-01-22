import React from 'react';
import { Biography } from './components/Biography';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex justify-center py-12 px-6 sm:px-8 md:py-24 print:block print:h-auto print:p-0 print:w-full">
      <main className="w-full max-w-2xl mx-auto print:max-w-none">
        <Biography />
      </main>
    </div>
  );
};

export default App;