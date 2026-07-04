export const fadeUp = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-90px" },
  transition: { duration: 0.75, ease: "easeOut" }
} as const;

export const heroFade = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: "easeOut" }
} as const;

export function staggerDelay(index: number, step = 0.05) {
  return { ...fadeUp.transition, delay: index * step };
}

export const branchSway = {
  animate: { y: [0, -6, 0] },
  transition: { duration: 8, ease: "easeInOut" as const, repeat: Infinity }
};

export const treeSway = {
  animate: { y: [0, -4, 0] },
  transition: { duration: 12, ease: "easeInOut" as const, repeat: Infinity }
};

export const petalBranchSway = {
  animate: { y: [0, -3, 0] },
  transition: { duration: 10, ease: "easeInOut" as const, repeat: Infinity }
};
