import React, { useEffect, useState } from 'react'
import { getToJSON } from './helpers'

async function fetchSpotPrice(setData: React.Dispatch<string>, url: string) {
    const spotPrice = await getToJSON(url)    
    setData(spotPrice.data?.amount)
}

function useSpotPrice(currency: string): string {
    const [data, setData] = useState('N/A')
    useEffect(function() {
        fetchSpotPrice(setData, `https://api.coinbase.com/v2/prices/${currency}-USD/buy`)
    }, [])

    return data
}

export default useSpotPrice