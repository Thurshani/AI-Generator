export function formatMessageTime(date) {
  if (!date || isNaN(new Date(date))) return "Invalid time";
  return new Date(date).toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}


