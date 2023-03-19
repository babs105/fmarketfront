export const formatDateDDmmyyyy = (date = new Date()) => {
  let year, month, day;

  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();

  month = month.toString().padStart(2, 0);
  day = day.toString().padStart(2, 0);

  return `${day}/${month}/${year}`;
};
export const formatDateYYYYMMdd = (date = new Date()) => {
  let year, month, day;

  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();

  month = month.toString().padStart(2, 0);
  day = day.toString().padStart(2, 0);
  console.log(`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;
};
export const formatDateDDmmyyyyhhmm = (date = new Date()) => {
  let year, month, day, hours, minutes;

  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  hours = date.getHours();
  minutes = date.getMinutes();
  month = month.toString().padStart(2, 0);
  day = day.toString().padStart(2, 0);
  hours = hours.toString();
  minutes = minutes.toString();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
