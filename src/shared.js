import axios from 'axios';

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

  formatMoney(amount) {
    return `${amount.toLocaleString('se')} kr`;
  },

  dataExistsCheck(date, onResponse) {
    const filename = this.toJsonFilename(date);

    axios
      .get(filename)
      .then(() => {
        onResponse(true);
      })
      .catch(() => {
        onResponse(false);
      });
  },
};
