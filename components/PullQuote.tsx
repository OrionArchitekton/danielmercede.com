import React from 'react';

interface PullQuoteProps {
  children: React.ReactNode;
}

export const PullQuote: React.FC<PullQuoteProps> = ({ children }) => {
  return (
    <div className="my-12 pl-6 border-l-2 border-neutral-200 md:pl-8 md:-ml-8 py-2">
      <blockquote className="text-xl md:text-2xl font-serif text-neutral-700 italic leading-relaxed">
        {children}
      </blockquote>
    </div>
  );
};