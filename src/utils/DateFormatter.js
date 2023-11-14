export const DateFormatter = {
  createDateFromDay: (day) => {
    const date = new Date(Date.UTC(2023, 11, day));
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(date.getTime() + kstOffset);

    return kstDate;
  },
};
