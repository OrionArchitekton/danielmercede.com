import React from 'react';
import { PullQuote } from './PullQuote';

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

  return (
    <article className="max-w-none">
      {/* Header Section */}
      <header className="mb-12 md:mb-20 flex flex-col gap-6 print:mb-8">
        <div className="flex justify-between items-baseline">
          <h1 className="text-2xl font-medium tracking-wide text-neutral-900 font-sans fade-in-up print:text-black" style={{ animationDelay: '0ms' }}>
            Daniel Mercede
          </h1>
          <button
            onClick={handlePrint}
            className="text-xs font-sans text-neutral-400 hover:text-neutral-600 transition-colors uppercase tracking-wider fade-in-up print:hidden cursor-pointer"
            style={{ animationDelay: '100ms' }}
            aria-label="Print this biography"
          >
            Print / PDF
          </button>
        </div>

        <div className="fade-in-up" style={{ animationDelay: '200ms' }}>
          <p className="font-serif text-lg text-neutral-600 italic leading-relaxed pl-1 print:text-black">
            Systems architect. Operational realist. Building at the intersection of logic, responsibility, and human dynamics.
          </p>
        </div>
      </header>

      {/* Main Prose */}
      <div className="prose prose-lg prose-neutral max-w-none font-serif text-neutral-800 leading-relaxed md:leading-loose print:text-black print:leading-normal">
        <FadeIn delay={250}>
          <div className="mb-10 aspect-video w-full overflow-hidden rounded-sm">
            <img
              src="https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/contextual/dan-mercede-founder-working-portait.webp"
              alt="Dan Mercede Founder Cosmocrat"
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="mb-8">
            I was born in Connecticut, raised in a small town outside Cleveland, and educated across multiple countries before most people decide who they are supposed to be.
          </p>
        </FadeIn>

        <FadeIn delay={400}>
          <p className="mb-8">
            I grew up in Chagrin Falls, Ohio, the youngest of four siblings with three older sisters. That environment shaped two things early: a strong internal compass and a comfort navigating complex social dynamics. I learned to observe before speaking, to reason through situations, and to operate independently without needing external validation.
          </p>
        </FadeIn>

        <FadeIn delay={500}>
          <p className="mb-8">
            During high school, my family moved to Lausanne, Switzerland. Living abroad at that age recalibrated how I saw the world. Different languages, different systems, different expectations — all operating coherently without my home culture as the default. It forced adaptability, curiosity, and perspective.
          </p>
        </FadeIn>

        <FadeIn delay={600}>
          <PullQuote>
            I learned quickly that competence matters more than confidence, and systems matter more than personalities.
          </PullQuote>
        </FadeIn>

        <FadeIn delay={700}>
          <p className="mb-8">
            Over the years, I’ve lived and worked across Canada, Switzerland, Wisconsin, Ohio, California, and Connecticut. Each place added a layer: structure, pragmatism, scale, pace. I’ve always been drawn to environments where systems either succeed or fail visibly — and where outcomes are measurable.
          </p>
        </FadeIn>

        <FadeIn delay={800}>
          <PullQuote>
            I learned what breaks under pressure, what scales, and what quietly compounds over time.
          </PullQuote>
        </FadeIn>

        <FadeIn delay={900}>
          <p className="mb-8">
            My professional path hasn’t been linear, but it has been consistent. I’ve worked in operations, finance, sales leadership, and executive management. Before building technology systems, I ran real ones — teams, revenue lines, daily execution cadences. I learned what survives stress, what scales cleanly, and what compounds without attention.
          </p>
        </FadeIn>

        <FadeIn delay={1000}>
          <p className="mb-8">
            That operational grounding is what ultimately pulled me into systems architecture. I didn’t come to technology from theory or novelty — I came to it because manual systems hit their limits. Complexity increases, decisions multiply, and without structure, organizations drift. I became interested in how intelligence could augment execution without replacing accountability.
          </p>
        </FadeIn>

        <FadeIn delay={1100}>
          <p className="mb-8">
            Today, my work sits at the intersection of logic and responsibility. I’m analytical by nature — precise, structured, outcome-oriented — but I’m also deeply aware that systems shape human behavior. Intelligence without values becomes unstable. Automation without governance becomes risk. The goal is not maximum speed or novelty; it’s alignment.
          </p>
        </FadeIn>

        <FadeIn delay={1200}>
          <PullQuote>
            I think in systems, but I build for people.
          </PullQuote>
        </FadeIn>

        <FadeIn delay={1300}>
          <p className="mb-8">
            There’s also a quieter dimension to my work that doesn’t show up on résumés. I’ve always held a balance between rational analysis and inner awareness — a respect for intuition, pattern recognition, and long-term consequence. Logic determines how systems function; wisdom determines whether they should.
          </p>
        </FadeIn>

        <FadeIn delay={1400}>
          <p className="mb-8">
            That balance — technical rigor paired with ethical restraint — is the throughline in everything I build.
          </p>
        </FadeIn>
      </div>

      {/* Footer / Context */}
      <footer className="mt-20 md:mt-32 pt-12 border-t border-neutral-100 fade-in-up print:hidden flex flex-col md:flex-row justify-between items-end gap-4" style={{ animationDelay: '1500ms' }}>
        <a
          href="https://danmercede.com"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-400 font-sans text-sm tracking-tight italic hover:text-neutral-600 transition-colors"
        >
          Context: danmercede.com
        </a>
        <p className="text-neutral-400 font-sans text-sm tracking-tight text-right italic">
          This page exists to provide context for the systems I build today.
        </p>
      </footer>
    </article>
  );
};