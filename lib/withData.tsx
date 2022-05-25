import React, { useEffect, useState } from "react";

type CurrencyDataItem = {
    id: string,
    name: string
} 

type RateDataItem = {
    value: string,
}

export type ExchangeItem = (RateDataItem & CurrencyDataItem)

// default state to return non-optional type
const defState: ExchangeItem[] = []

/**
 * A sort function that uses the currencies exchange rate in USD to determine order
 * @param {array} r1
 * @param {array} r2
 * @returns {number} difference between r1 and r2 for descending ordered array
 */
function sortRates(r1: RateDataItem, r2: RateDataItem): number {
    return parseFloat(r1.value) - parseFloat(r2.value)
}

async function getToJSON(url: string): Promise<any> {
    const res = await fetch(url)
    return res.json()
}

/** 
 * this is to use the async/await with fetch and using state to handle the changes
 * @param {function} setData
*/
async function fetchExchangeRates(setData: React.Dispatch<ExchangeItem[]>){
    const rateData = await getToJSON("https://api.coinbase.com/v2/exchange-rates")
    const currencies: CurrencyDataItem[] = await getToJSON("https://api.exchange.coinbase.com/currencies")
    
    const rates = rateData.data?.rates
    if(rates){
        const sortedRates = currencies.map((currency: CurrencyDataItem) => ({            
            value: rates[currency.id],
            ...currency
        }))
        .filter(currency => currency.value)
        .sort(sortRates)
        
        setData(sortedRates)
    }
}

/**
 * this is a hook to handle fetching and modelling data
 * @returns {object} CurrencyData type from the call
 */
function withData(): ExchangeItem[] {
    const [data, setData] = useState<ExchangeItem[]>(defState)
    useEffect(function(){
        fetchExchangeRates(setData)
    }, [])

    return data.slice(0, 10)
}

export default withData

