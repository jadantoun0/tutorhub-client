import { countriesOptions } from "./comboBoxOptions";
import moment from 'moment';

export const calculateRating = (reviews) => {
    if (reviews.lenght === 0) 
        return 0;

    let sum = 0;
    let i = 0;
    reviews.forEach(review => {
        sum += review.rating;
        i++;
    })
    return sum / i;
}


export const capitalizeFirstLetter = (inputString) => {
    if (!inputString) return ""
    return inputString
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

export const formatDate = (isoDateString) => {
    if (!isoDateString) return ""
    return moment(isoDateString).format('YYYY-MM-DD');
};

export const formatDateWithDayName = (inputDate) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
};


export const formatDateWithoutTime = (dateKey) => {
    const dateObject = new Date(dateKey);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return dateObject.toLocaleDateString('en-US', options);    
}


export function getCountryLabelByValue(countryValue) {
    const countryOption = countriesOptions.find(country => country.value === countryValue);

    // Check if the country with the specified value was found
    if (countryOption) {
        return countryOption.label;
    } else {
        return null; 
    }
}
