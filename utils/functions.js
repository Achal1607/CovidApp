import Intl from 'intl'
import 'intl/locale-data/jsonp/en-IN';

export const formatNumber = (value) => {
    const numberFormatter = new Intl.NumberFormat('en-IN');
    return isNaN(value) ? '-' : numberFormatter.format(value);
};

