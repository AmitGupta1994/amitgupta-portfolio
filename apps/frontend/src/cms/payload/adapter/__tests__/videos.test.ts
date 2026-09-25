import { describe, it, expect } from 'vitest';
import { mapVideo, youtubeIdFrom } from '../videos';

describe('youtubeIdFrom', () => {
  it('reads the id from every common YouTube link shape', () => {
    expect(youtubeIdFrom('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(youtubeIdFrom('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(youtubeIdFrom('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(youtubeIdFrom('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(youtubeIdFrom('https://www.youtube.com/watch?list=abc&v=dQw4w9WgXcQ&t=30')).toBe('dQw4w9WgXcQ');
  });

  it('returns an empty id for links it cannot parse', () => {
    expect(youtubeIdFrom('https://vimeo.com/123456')).toBe('');
  });
});

describe('mapVideo', () => {
  it('derives the thumbnail from the id', () => {
    const video = mapVideo({
      id: 4,
      title: 'Everest Base Camp',
      url: 'https://youtu.be/dQw4w9WgXcQ',
      description: 'Twelve days on the trail.',
    });

    expect(video).toMatchObject({
      id: '4',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      description: 'Twelve days on the trail.',
    });
  });
});
