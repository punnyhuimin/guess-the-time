export const formatMsToString = (ms: number): string => {
  console.log(ms);
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;
  console.log(seconds);
  const parts = [];
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || minutes > 0) parts.push(`${seconds}s`);
  parts.push(`${milliseconds}ms`);
  console.log(parts);
  return parts.join(' ');
};
