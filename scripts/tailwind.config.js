tailwind.config = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        fg: 'var(--color-fg)',
        secondary: 'var(--color-secondary)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'accent-ink': 'var(--color-accent-ink)',
        'accent-fill': 'var(--color-accent-fill)',
      },
      fontFamily: {
        display: ['"Onest"', 'system-ui', 'sans-serif'],
        sans: ['"Onest"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '12':  ['12px',  { lineHeight: '1.4' }],
        '14':  ['14px',  { lineHeight: '1.5' }],
        '16':  ['16px',  { lineHeight: '1.6' }],
        '18':  ['18px',  { lineHeight: '1.6' }],
        '24':  ['24px',  { lineHeight: '1.3' }],
        '32':  ['32px',  { lineHeight: '1.2' }],
        '48':  ['48px',  { lineHeight: '1.1' }],
        '72':  ['72px',  { lineHeight: '1.05' }],
        '120': ['120px', { lineHeight: '0.95' }],
      },
      maxWidth: {
        content: '1200px',
        prose: '720px',
      },
    },
  },
};
