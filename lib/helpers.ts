import {RateDataItem} from './CoinbaseModel'

/**
 * A sort function that uses the currencies exchange rate in USD to determine order
 * @param {array} r1
 * @param {array} r2
 * @returns {number} difference between r1 and r2 for descending ordered array
 */
function sortRates(r1: RateDataItem, r2: RateDataItem): number {
    return parseFloat(r2.price) - parseFloat(r1.price)
}

async function getToJSON(url: string): Promise<any> {
    const res = await fetch(url)
    return res.json()
}

function invertBase(rate: string): string {    
    return (1.00/parseFloat(rate)).toFixed(2)
}

export {
    invertBase,
    getToJSON,
    sortRates
}