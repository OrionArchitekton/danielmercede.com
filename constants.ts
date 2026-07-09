
export type ImageMeta = { alt: string; description?: string };

export const IMAGE_METADATA = {
    // Executive / Authority Set
    "dan-mercede-executive-authority.png": {
        alt: "Dan Mercede, founder, operator, and systems builder",
        description:
            "Executive portrait of Dan Mercede, founder and operator focused on owned AI workflows and systems teams can run.",
    },
    "dan-mercede-executive-outdoor.png": {
        alt: "Dan Mercede, founder and systems architect for operator-led AI workflows",
        description:
            "Outdoor executive portrait of Dan Mercede, founder and systems architect specializing in workflow ownership and governed AI as proof depth.",
    },
    "dan-mercede-executive-relaxed.png": {
        alt: "Dan Mercede, founder and systems architect for operator-led AI workflows",
        description:
            "Relaxed executive portrait of Dan Mercede, founder and systems architect working on owned workflows and AI-assisted systems.",
    },

    // Founder / Working Headshots
    "dan-mercede-founder-headshot.png": {
        alt: "Dan Mercede working as founder and systems architect on operator-led AI systems",
        description:
            "Founder headshot of Dan Mercede, actively building and operating AI-assisted workflows with a focus on execution and ownership.",
    },
    "dan-mercede-founder-headshot-sm.png": {
        alt: "Dan Mercede working as founder and systems architect on operator-led AI systems",
        description:
            "Scaled founder headshot of Dan Mercede focused on hands-on AI system design and workflow ownership.",
    },
    "dan-mercede-founder-headshot-xs.png": {
        alt: "Dan Mercede working as founder and systems architect on operator-led AI systems",
        description:
            "Compact founder headshot of Dan Mercede emphasizing hands-on work turning AI into owned workflows.",
    },

    // Founder / Social & Working Context
    "dan-mercede-founder-social-landscape.png": {
        alt: "Dan Mercede, founder and systems architect in a working environment",
        description:
            "Landscape portrait of Dan Mercede in a casual working environment, representing hands-on leadership in operator-led AI systems.",
    },
    "dan-mercede-founder-social-portrait.png": {
        alt: "Dan Mercede, founder and systems architect in a working environment",
        description:
            "Portrait of Dan Mercede in a social working context, reflecting active system design and founder-led execution.",
    },
    "dan-mercede-founder-working-landscape.png": {
        alt: "Dan Mercede working as founder and systems architect on operator-led AI systems",
        description:
            "Landscape image of Dan Mercede actively working on AI workflow architecture and execution.",
    },
    "dan-mercede-founder-working-portrait.webp": {
        alt: "Dan Mercede working as founder and systems architect on operator-led AI systems",
        description:
            "Portrait of Dan Mercede in a focused working setting, emphasizing hands-on system building and workflow ownership.",
    },
} as const satisfies Record<string, ImageMeta>;

const basename = (src: string) => src.split("/").pop() || src;

export function getImageMeta(srcOrFilename: string): ImageMeta {
    const key = basename(srcOrFilename);
    const meta = (IMAGE_METADATA as Record<string, ImageMeta>)[key];

    if (!meta) {
        // Dev: fail loud. Prod: safe fallback.
        if (import.meta.env.DEV) {
            throw new Error(`Missing IMAGE_METADATA for: ${key}`);
        }
        return { alt: "Dan Mercede", description: undefined };
    }

    return meta;
}
