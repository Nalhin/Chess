import moment from 'moment';

export const calculateTimeDifferenceInSeconds = (time: string) => {
  const date = moment(new Date());
  const end = moment(time);
  return Math.floor(moment.duration(date.diff(end)).asSeconds());
};
