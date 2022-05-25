import React, { useEffect, useContext, useState } from 'react'
import { getToJSON } from './helpers'
import SpotPriceContext from './SpotPriceContext'

async function fetchSpotPrice(onUpdate: Function, url: string) {
    const spotPrice = await getToJSON(url)    
    onUpdate(spotPrice.data?.amount)
}

function useSpotPrice(id: string, isLast: boolean = false): string {
    const spotPriceContext = useContext(SpotPriceContext)    
    useEffect(function() {
        if(spotPriceContext.current[id] || isLast) return
        
        const url = `https://api.coinbase.com/v2/prices/${id}-USD/buy`
        function handleUpdate(value: string){                        
            spotPriceContext.onUpdate(id, value)
        }
        fetchSpotPrice(handleUpdate, url)
    }, [Boolean(spotPriceContext.current[id])])

    if(isLast)
        return spotPriceContext.last[id] || "N/A"

    return spotPriceContext.current[id] || "fetching..."
}

export default useSpotPrice