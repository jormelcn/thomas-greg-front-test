export default function isoStringDateToHumanDateTime(isoStringDate: string) {
  const formater = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formater.format(new Date(isoStringDate));
}
