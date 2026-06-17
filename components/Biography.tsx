import React from 'react';
import { PullQuote } from './PullQuote';
import { getImageMeta } from '../constants';
// Canonical bio copy shared with the build-time body-bake emitter
// (scripts/bakeBody.mjs) so the crawlable served <body> never drifts from
// this client render.
import { HEADING, STANDFIRST, BODY_BLOCKS } from '../bioContent.mjs';

const FadeIn: React.FC<{ delay?: number; children: React.ReactNode }> = ({ delay = 0, children }) => (
  <div
    className="fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export const Biography: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const portraitSrc = "/dan-mercede-founder-working-portrait.webp";
  const portraitMeta = getImageMeta(portraitSrc);

  return (
    <article className="max-w-none">
      {/* Header Section */}
      <header className="mb-12 md:mb-20 flex flex-col gap-6 print:mb-8">
        <div className="flex justify-between items-baseline">
          <h1 className="text-2xl font-medium tracking-wide text-neutral-900 font-sans fade-in-up print:text-black" style={{ animationDelay: '0ms' }}>
            {HEADING}
          </h1>
          <button
            onClick={handlePrint}
            className="text-xs font-sans text-neutral-500 hover:text-neutral-600 transition-colors uppercase tracking-wider fade-in-up print:hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-sm"
            style={{ animationDelay: '100ms' }}
            aria-label="Print this biography"
          >
            Print / PDF
          </button>
        </div>

        <div className="fade-in-up" style={{ animationDelay: '200ms' }}>
          <p className="font-serif text-lg text-neutral-600 italic leading-relaxed pl-1 print:text-black">
            {STANDFIRST}
          </p>
        </div>
      </header>

      {/* Main Prose */}
      <div className="prose prose-lg prose-neutral max-w-none font-serif text-neutral-800 leading-relaxed md:leading-loose print:text-black print:leading-normal">
        <FadeIn delay={250}>
          <div className="mb-10 aspect-video w-full overflow-hidden rounded-sm">
            <img
              src={portraitSrc}
              alt={portraitMeta.alt}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              style={{ objectPosition: '50% 36%' }}
            />
          </div>

        </FadeIn>

        {BODY_BLOCKS.map((block, i) => (
          <FadeIn key={i} delay={300 + i * 100}>
            {block.type === 'quote' ? (
              <PullQuote>{block.text}</PullQuote>
            ) : (
              <p className="mb-8">{block.text}</p>
            )}
          </FadeIn>
        ))}
      </div>

      {/* Footer / Context */}
      <footer className="mt-20 md:mt-32 pt-12 border-t border-neutral-100 fade-in-up print:hidden flex flex-col gap-6" style={{ animationDelay: '1500ms' }}>
        <div className="flex flex-col items-center gap-1">
          <a
            href="https://www.orionintelligenceagency.com/book"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-900 font-sans text-sm font-medium tracking-wide hover:underline underline-offset-4 transition-colors"
          >
            Book a Runtime Governance Readiness Scan <span aria-hidden="true">&rarr;</span><span className="sr-only"> (opens in a new tab)</span>
          </a>
          <span className="text-neutral-500 font-sans text-xs tracking-tight">
            Gap map &bull; Failure heatmap &bull; Enforcement checklist &bull; 30/60/90 plan
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <a
            href="https://www.danmercede.com"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-500 font-sans text-sm tracking-tight italic hover:text-neutral-600 transition-colors"
          >
            Context: danmercede.com<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="text-neutral-500 font-sans text-sm tracking-tight text-right italic">
            This page exists to provide context for the systems I build today.
          </p>
        </div>
      </footer>
    </article>
  );
};