export const formatDate = (date: string) => {
  let dateObject = new Date(date);
  let yyyy = dateObject.getFullYear(),
    mm = `0${dateObject.getMonth() + 1}`.slice(-2),
    dd = `0${dateObject.getDate() + 1}`.slice(-2);
  return `${dd}/${mm}/${yyyy}`;
};
