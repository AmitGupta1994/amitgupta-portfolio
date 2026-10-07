import { describe, expect, it } from 'vitest';
import { mapProduct } from '../products';

describe('mapProduct', () => {
  const doc = {
    id: 3,
    name: 'Ledger',
    tagline: 'Invoicing for freelancers',
    description: 'Send invoices, get paid.',
    status: null,
    techStack: [{ name: 'Next.js' }, { name: 'PostgreSQL' }],
    url: '',
    image: null,
    imageUrl: null,
  };

  it('flattens the stack, defaults the status and drops empty links', () => {
    expect(mapProduct(doc)).toEqual({
      id: '3',
      name: 'Ledger',
      tagline: 'Invoicing for freelancers',
      description: 'Send invoices, get paid.',
      status: 'building',
      techStack: ['Next.js', 'PostgreSQL'],
      url: undefined,
      imageUrl: undefined,
    });
  });

  it('prefers an uploaded image over the external URL', () => {
    const product = mapProduct({ ...doc, image: { id: 1, url: '/api/techcompany-photos/file/a.png' }, imageUrl: 'https://x/y.png' });
    expect(product.imageUrl).toBe('/api/techcompany-photos/file/a.png');
  });
});
