export function isoStringDateToLocalStringDate(text: string): string {
  const date = new Date(text);
  if (date.getHours() === 0 && date.getMinutes() === 0) {
    date.setDate(date.getDate() - 1);
  }
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}
