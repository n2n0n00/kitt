export function formatTime(timer) {
  let date = new Date(timer);

  // Convert UTC time to local time
  let localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  // Extract date components
  let day = localDate.getDate().toString().padStart(2, "0");
  let month = (localDate.getMonth() + 1).toString().padStart(2, "0");
  let year = localDate.getFullYear().toString();

  // Extract time components
  let hours = localDate.getHours().toString().padStart(2, "0");
  let minutes = localDate.getMinutes().toString().padStart(2, "0");

  // Format date and time strings
  let dateString = `${day}/${month}/${year}`;
  let timeString = `${hours}:${minutes}`;

  let dateTime = `${dateString} ${timeString}`;

  return dateTime;
}
