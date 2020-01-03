export const isoDateToSecondsMinutesAndHours = (date: string) => {
  const dateFromString = new Date(date);
  return `${dateFromString.getHours()}:${dateFromString.getMinutes()}:${dateFromString.getSeconds()}`;
};
