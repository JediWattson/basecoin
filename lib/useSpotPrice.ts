import React, { useEffect, useContext, useState } from 'react'
import { getToJSON } from './helpers'
import SpotPriceContext from './SpotPriceContext'

async function fetchSpotPrice(onUpdate: Function, url: string) {
    const spotPrice = await getToJSON(url)    
    onUpdate(spotPrice.data?.amount)
}

function useSpotPrice(id: string): string {
    const spotPriceContext = useContext(SpotPriceContext)
    useEffect(function() {
        if(spotPriceContext.current[id]) return 
        const url = `https://api.coinbase.com/v2/prices/${id}-USD/buy`
        function handleUpdate(value: string){            
            spotPriceContext.onUpdate(id, value) 
        }
        fetchSpotPrice(handleUpdate, url)
    }, [])

    console.log(id, spotPriceContext.current[id]);
    return spotPriceContext.current[id]
}

export default useSpotPrice