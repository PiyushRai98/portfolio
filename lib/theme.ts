/**
 * Instrument Panel — design tokens as JS constants
 * Used in canvas/Three.js contexts where CSS vars aren't accessible.
 *
 * --phosphor is reserved for interactive elements (CTAs, links, focus).
 * --copper is reserved for status/informational (dividers, indicators, dates).
 */
export const theme = {
  accent: {
    /** Interactive accent — CTAs, links, active states */
    phosphor: "#FFB000",
    /** Informational accent — status, dividers, timeline, badges */
    copper: "#C87137",
    /** Legacy aliases — kept for Three.js NeuralScene (being replaced) */
    cyan: "#FFB000",
    sapphire: "#C87137",
    violet: "#C87137",
    amber: "#C87137",
  },
  surface: {
    void: "#0F1210",
    voidRaised: "#171B18",
    /** Legacy aliases */
    base: "#0F1210",
    elevated: "#171B18",
    recessed: "#131711",
  },
  text: {
    vellum: "#E8E4D9",
    vellumDim: "#B8B4AA",
    graphite: "#8A8F87",
  },
} as const;
