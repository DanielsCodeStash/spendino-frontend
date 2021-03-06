import axios from 'axios';
import shared from './shared';

export default {

    initDatastore(initDate) {
        this.initDate = initDate;
        console.log(`initiation datastore at ${initDate.year}-${initDate.month}`);
        
        const datesBackCache = 24;

        this.data = {};
        let activeDate = initDate;
        let i = 0;
        do {
            this.fetchMonthData(activeDate);

            activeDate = shared.subtractMonth(activeDate);
            i += 1;
        } while (i <= datesBackCache);
    },

    fetchMonthData(date) {
        const jsonFileName = shared.toJsonFilename(date);

        axios
            .get(jsonFileName)
            .then(response => this.handleResponse(response, this, date))
            .catch((r) => {
                // console.log(`fail ${r}`);
            });
    },

    handleResponse(response, dataStore, activeDate) {
        dataStore.data[`${activeDate.year}${activeDate.month}`] = response.data;
    },

    getHistoricalDataForSubcategory(category) {
        const datesBackCache = 24;
        let i = 0;
        const returnData = [];
        let activeDate = this.initDate;
        do {

            const data = this.getCategoryData(activeDate, category);
            returnData.push(data);

            activeDate = shared.subtractMonth(activeDate);
            i += 1;
        } while (i <= datesBackCache);      

        return returnData;
    },

    getCategoryData(date, category) {
        const fullData = this.data[`${date.year}${date.month}`];

        let out = { d: date, v: '' };

        if (!fullData) {
            return out;
        }

        fullData.forEach((element) => {
            if (element.g2 === category) {
                out = { d: date, v: element.value };
            }
        });
        return out;
    },
};
