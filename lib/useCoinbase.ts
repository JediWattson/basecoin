import React, { useEffect, useState } from "react";
import { sortRates, invertBase, getToJSON } from './helpers'
import { ExchangeItem, CurrencyDataItem } from "./CoinbaseModel";

// default state to return non-optional type
const defState: ExchangeItem[] = []

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
            value: invertBase(rates[currency.id]),
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
function useCoinbase(): ExchangeItem[] {
    const [data, setData] = useState<ExchangeItem[]>(defState)
    useEffect(function(){
        fetchExchangeRates(setData)
    }, [])

    return data.slice(0, 10)
}


export default useCoinbase

