import React from 'react'

type Cache = {
    [key: string]: string
}

type ContextCache = {
    last: Cache,
    current: Cache,
    onUpdate: Function,
    saveToLast: Function
}

export const spotPriceCache: ContextCache = { 
    current: {}, 
    last: {},
    onUpdate(id: string, value: string){},
    saveToLast(){}
}
const SpotPriceContext = React.createContext(spotPriceCache)
export default SpotPriceContext