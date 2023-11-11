export function convertToKSTDate(year, month, day) {
  const date = new Date(Date.UTC(year, month, day));
  date.setHours(date.getHours() + 9);
  return date;
}
