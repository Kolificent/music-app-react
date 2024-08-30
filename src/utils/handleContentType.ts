export default function handleContentType(
  contentType: 'playlist' | 'album' | 'track' | 'artist',
) {
  switch (contentType) {
    case 'playlist':
      return 'Плейлист';
    case 'album':
      return 'Альбом';
    case 'track':
      return 'Трек';
    case 'artist':
      return 'Исполнитель';

    default:
      break;
  }
}
