import handleContentType from './handleContentType';
import { describe, expect, it } from 'vitest';

describe('#handleContentType', () => {
  it('album string value to rus label Альбом', () => {
    expect(handleContentType('album')).toBe('Альбом');
  });
  it('playlist string value to rus label Плейлист', () => {
    expect(handleContentType('playlist')).toBe('Плейлист');
  });
  it('track string value to rus label Трек', () => {
    expect(handleContentType('track')).toBe('Трек');
  });
  it('artist string value to rus label Исполнитель', () => {
    expect(handleContentType('artist')).toBe('Исполнитель');
  });
});
// test('album string value to rus label Альбом', () => {
//   const result = handleContentType('album');
//   expect(result).toBe('Альбом');
// });
// test('two plus two is four', () => {
//   expect(2 + 2).toBe(4);
// });
