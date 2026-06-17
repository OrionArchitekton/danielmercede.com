// Canonical biography content — single source of truth for BOTH the React
// render (components/Biography.tsx) and the build-time body-bake emitter
// (scripts/bakeBody.mjs). Keeping the copy here prevents the served (crawlable)
// <body> from drifting away from the hydrated client render.
//
// Plain .mjs (no TS): the build-time emitter runs under bare Node with no tsx,
// and Vite resolves .mjs imports natively for the browser bundle, so one module
// feeds both consumers without a transpile step or a new dependency.

// Page heading + the standfirst (lede) shown directly under the name.
export const HEADING = 'Daniel Mercede';

export const STANDFIRST =
  'Runtime governance architect. Building governed AI systems that fail closed, enforce authority, and generate audit-grade receipts.';

// Ordered body blocks. type 'p' = paragraph, type 'quote' = pull-quote.
// The React component and the baked HTML render this same sequence.
export const BODY_BLOCKS = [
  {
    type: 'p',
    text: 'I was born in Connecticut, raised in a small town outside Cleveland, and educated across multiple countries before most people decide who they are supposed to be.',
  },
  {
    type: 'p',
    text: 'I grew up in Chagrin Falls, Ohio, the youngest of four siblings with three older sisters. That environment shaped two things early: a strong internal compass and a comfort navigating complex social dynamics. I learned to observe before speaking, to reason through situations, and to operate independently without needing external validation.',
  },
  {
    type: 'p',
    text: 'During high school, my family moved to Lausanne, Switzerland. Living abroad at that age recalibrated how I saw the world. Different languages, different systems, different expectations — all operating coherently without my home culture as the default. It forced adaptability, curiosity, and perspective.',
  },
  {
    type: 'quote',
    text: 'I learned quickly that competence matters more than confidence, and systems matter more than personalities.',
  },
  {
    type: 'p',
    text: 'Over the years, I’ve lived and worked across Canada, Switzerland, Wisconsin, Ohio, California, and Connecticut. Each place added a layer: structure, pragmatism, scale, pace. I’ve always been drawn to environments where systems either succeed or fail visibly — and where outcomes are measurable.',
  },
  {
    type: 'quote',
    text: 'I learned what breaks under pressure, what scales, and what quietly compounds over time.',
  },
  {
    type: 'p',
    text: 'My professional path hasn’t been linear, but it has been consistent. I’ve worked in operations, finance, sales leadership, and executive management. Before building technology systems, I ran real ones — teams, revenue lines, daily execution cadences. I learned what survives stress, what scales cleanly, and what compounds without attention.',
  },
  {
    type: 'p',
    text: 'That operational grounding is what ultimately pulled me into systems architecture. I didn’t come to technology from theory or novelty — I came to it because manual systems hit their limits. Complexity increases, decisions multiply, and without structure, organizations drift. I became interested in how intelligence could augment execution without replacing accountability.',
  },
  {
    type: 'p',
    text: 'Today, my work sits at the intersection of logic and responsibility. I’m analytical by nature — precise, structured, outcome-oriented — but I’m also deeply aware that systems shape human behavior. Intelligence without values becomes unstable. Automation without governance becomes risk. The goal is not maximum speed or novelty; it’s alignment.',
  },
  {
    type: 'quote',
    text: 'I think in systems, but I build for people.',
  },
  {
    type: 'p',
    text: 'There’s also a quieter dimension to my work that doesn’t show up on résumés. I’ve always held a balance between rational analysis and inner awareness — a respect for intuition, pattern recognition, and long-term consequence. Logic determines how systems function; wisdom determines whether they should.',
  },
  {
    type: 'p',
    text: 'That balance — technical rigor paired with ethical restraint — is the throughline in everything I build.',
  },
];
