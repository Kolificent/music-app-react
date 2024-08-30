export default function convertDuration(duration_ms: number) {
  const totalSeconds = Math.round(duration_ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
