import { describe, it, expect } from 'vitest';
import { mapPhoto } from '../photos';

describe('mapPhoto', () => {
  it('maps an uploaded photo', () => {
    expect(
      mapPhoto({
        id: 9,
        url: '/api/photos/file/kala-patthar.jpg',
        caption: 'Kala Patthar at dawn',
        album: 'Everest Base Camp 2024',
        location: 'Khumbu, Nepal',
        width: 4000,
        height: 3000,
      })
    ).toEqual({
      id: '9',
      url: '/api/photos/file/kala-patthar.jpg',
      caption: 'Kala Patthar at dawn',
      album: 'Everest Base Camp 2024',
      location: 'Khumbu, Nepal',
      width: 4000,
      height: 3000,
    });
  });

  it('turns empty optional fields into undefined', () => {
    const photo = mapPhoto({ id: 1, url: '/x.jpg', caption: null, album: null, location: null });
    expect(photo.caption).toBeUndefined();
    expect(photo.album).toBeUndefined();
  });
});
