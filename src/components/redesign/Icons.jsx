// Shared inline icons used across the redesigned site. Consolidated here once instead of
// repeating the same SVG markup in every section that needs a copy/WhatsApp/chevron glyph.

export function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

// Simple WhatsApp "bubble" glyph — used inline next to text links.
export function WhatsAppBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" />
    </svg>
  );
}

// Full WhatsApp glyph (bubble + handset detail) — used on the floating action button.
export function WhatsAppFullIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.03c-.24.68-1.19 1.25-1.95 1.41-.52.11-1.2.2-3.49-.75-2.93-1.21-4.81-4.19-4.96-4.38-.14-.19-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.24-.27.53-.34.71-.34h.51c.16 0 .38-.03.6.45.24.55.79 1.9.87 2.04.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.13-.29.28-.13.55.17.28.75 1.24 1.61 2 1.11.99 2.03 1.3 2.32 1.44.29.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.62.77 1.9.91.28.14.47.21.53.33.07.12.07.68-.16 1.35z" />
    </svg>
  );
}

// "+"-style chevron used on FAQ rows (rotates via CSS when the item is open).
export function PlusIcon() {
  return (
    <svg className="chev" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

export const CardIcons = {
  multimodal: () => (
    <svg viewBox="0 0 24 24">
      <path d="M3 17l1.5-5h15L21 17" />
      <path d="M6 12V5h8l3 4" />
      <path d="M2 20c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" strokeLinecap="round" />
    </svg>
  ),
  warehousing: () => (
    <svg viewBox="0 0 24 24">
      <path d="M3 10.5L12 4l9 6.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v10h14V10" strokeLinejoin="round" />
      <path d="M10 20v-6h4v6" strokeLinejoin="round" />
    </svg>
  ),
  fleet: () => (
    <svg viewBox="0 0 24 24">
      <path d="M2 16V7h11v9" strokeLinejoin="round" />
      <path d="M13 10h5l4 4v2h-2" strokeLinejoin="round" />
      <circle cx="6.5" cy="17.5" r="1.7" />
      <circle cx="16.5" cy="17.5" r="1.7" />
    </svg>
  ),
  customs: () => (
    <svg viewBox="0 0 24 24">
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" strokeLinecap="round" />
      <path d="M8.5 12l2 2 4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};
