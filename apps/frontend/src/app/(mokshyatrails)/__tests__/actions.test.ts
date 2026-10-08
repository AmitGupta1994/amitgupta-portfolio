import { beforeEach, describe, expect, it, vi } from 'vitest';

const requestBooking = vi.fn();
vi.mock('@/content', () => ({ requestBooking: (...args: unknown[]) => requestBooking(...args) }));

const { submitBooking } = await import('../actions');

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  Object.entries(fields).forEach(([key, value]) => data.set(key, value));
  return data;
};

const valid = {
  trek: 'everest-base-camp',
  departure: '2 Nov 2026',
  travellers: '2',
  name: 'Sita Rai',
  email: 'sita@example.com',
};

describe('submitBooking', () => {
  beforeEach(() => {
    requestBooking.mockReset();
    requestBooking.mockResolvedValue({ trekTitle: 'Everest Base Camp' });
  });

  it('saves a valid request and summarises it', async () => {
    const state = await submitBooking({ status: 'idle' }, form(valid));
    expect(state.status).toBe('success');
    expect(state.summary).toBe('Everest Base Camp — 2 Nov 2026, 2 travellers, Sita Rai');
    expect(requestBooking).toHaveBeenCalledWith('mokshyatrails', expect.objectContaining({ trekSlug: 'everest-base-camp', travellers: 2 }));
  });

  it('rejects bad fields without saving', async () => {
    const state = await submitBooking({ status: 'idle' }, form({ ...valid, name: ' ', email: 'nope', travellers: '0' }));
    expect(state.status).toBe('error');
    expect(Object.keys(state.errors ?? {})).toEqual(['name', 'email', 'travellers']);
    expect(requestBooking).not.toHaveBeenCalled();
  });

  it('needs a date for a private trek and records it', async () => {
    const missing = await submitBooking({ status: 'idle' }, form({ ...valid, departure: 'custom' }));
    expect(missing.errors?.preferredDate).toBeDefined();

    await submitBooking({ status: 'idle' }, form({ ...valid, departure: 'custom', preferredDate: '2027-04-10' }));
    expect(requestBooking).toHaveBeenCalledWith('mokshyatrails', expect.objectContaining({ departure: 'Private trek from 2027-04-10' }));
  });

  it('quietly drops honeypot submissions', async () => {
    const state = await submitBooking({ status: 'idle' }, form({ ...valid, website: 'spam.example' }));
    expect(state.status).toBe('success');
    expect(requestBooking).not.toHaveBeenCalled();
  });
});
