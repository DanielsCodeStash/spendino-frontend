export default {
  addMonth(date) {
    if (date.month === 12) {
      return {
        year: date.year + 1,
        month: 1,
      };
    }
    return {
      year: date.year,
      month: date.month + 1,
    };
  },
  subtractMonth(date) {
    if (date.month === 1) {
      return {
        year: date.year - 1,
        month: 12,
      };
    }
    return {
      year: date.year,
      month: date.month - 1,
    };
  },
  toJsonFilename(date) {
    let month;
    if (date.month.toString().length === 1) {
      month = `0${date.month}`;
    } else {
      month = date.month;
    }
    return `data/${date.year}${month}.json`;
  },
};
