import React, { useEffect, useState } from "react";

type CurrencyData = [string, string][]

/**
 * A sort function that uses the currencies exchange rate in USD to determine order
 * @param {array} r1
 * @param {array} r2
 * @returns {number} difference between r1 and r2 for descending ordered array
 */
function sortRates(r1: [string, string], r2: [string, string]): number {
    return parseFloat(r2[1]) - parseFloat(r1[1])
}

/** 
 * this is to use the async/await with fetch and using state to handle the changes
 * @param {function} setData
*/
async function fetchExchangeRates(setData: React.Dispatch<CurrencyData>){
    const res = await fetch("https://api.coinbase.com/v2/exchange-rates")
    const data = await res.json()
    const rates = data?.data?.rates
    if(rates){
        const sortedRates = Object
            .entries<string>(rates)
            .sort(sortRates)
        setData(sortedRates)
    }
}

/**
 * this is a hook to handle fetching and modelling data
 * @returns {object} CurrencyData type from the call
 */
function withData(){
    const [data, setData] = useState<CurrencyData>()
    useEffect(function(){
        fetchExchangeRates(setData)
    }, [])

    return data
}

export default withData

