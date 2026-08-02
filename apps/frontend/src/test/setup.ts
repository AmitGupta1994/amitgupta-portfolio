import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ src, alt, fill, ...rest }: any) => {
    return React.createElement('img', { src, alt, ...rest });
  },
}));
