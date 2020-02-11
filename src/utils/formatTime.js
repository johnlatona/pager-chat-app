const formatTime = timestamp => {
  const date = new Date(timestamp);
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const ampm = time.slice(-2).toLowerCase();
  return `${time.slice(0, time.length - 3)} ${ampm}`;
}

export default formatTime;