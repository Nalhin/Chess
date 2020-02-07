import dayjs from 'dayjs';

export const calculateTimeDifferenceInSeconds = (time: string) => {
  const date = dayjs();
  const end = dayjs(time);
  return date.diff(end, 'second');
};
