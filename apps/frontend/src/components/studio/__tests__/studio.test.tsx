import { describe, expect, it } from 'vitest';
import type { Video } from '@/types/video';
import { mailtoHref, sectionHref, whatsappHref } from '../contactLinks';
import { groupByAlbum } from '../WorkSection';

const video = (id: string, album?: string): Video => ({
  id,
  title: id,
  url: `https://youtu.be/${id}`,
  youtubeId: id,
  thumbnailUrl: '',
  album,
});

describe('groupByAlbum', () => {
  it('groups by album in order of first appearance, with a fallback for ungrouped videos', () => {
    const groups = groupByAlbum([video('a', 'Reels'), video('b'), video('c', 'Reels'), video('d', ' ')]);
    expect(groups.map((group) => [group.album, group.videos.map((v) => v.id)])).toEqual([
      ['Reels', ['a', 'c']],
      ['Featured', ['b', 'd']],
    ]);
  });
});

describe('contact links', () => {
  const contact = { email: 'hi@example.com', phone: '1', whatsapp: 'https://wa.me/9779800000000' };

  it('prefills the WhatsApp message, and skips it without a number', () => {
    expect(whatsappHref(contact, 'Hi there')).toBe('https://wa.me/9779800000000?text=Hi%20there');
    expect(whatsappHref({ ...contact, whatsapp: undefined }, 'Hi')).toBeUndefined();
  });

  it('encodes spaces in mailto links as %20, not +', () => {
    expect(mailtoHref('hi@example.com', 'New project', 'Hello there')).toBe(
      'mailto:hi@example.com?subject=New%20project&body=Hello%20there'
    );
  });

  it('turns CMS nav hrefs into same-page anchors', () => {
    expect(sectionHref('/#work')).toBe('#work');
    expect(sectionHref('https://example.com')).toBe('https://example.com');
  });
});
