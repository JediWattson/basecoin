import React, { useState } from "react";
import useCoinbase from "../../lib/useCoinbase"
import useSpotPrice from '../../lib/useSpotPrice'
import SpotPriceContext, { spotPriceCache } from '../../lib/SpotPriceContext'
import { ExchangeItem } from "../../lib/CoinbaseModel";

import "../styles/table.css"

function CurrentRow(props: ExchangeItem): JSX.Element {    
    return (
        <tr>
            <td>
                {props.name}
            </td>
            <td>
                {useSpotPrice(props.id)}
            </td>
            <td>
                {useSpotPrice(props.id, true)}
            </td>
        </tr>
    )
}

const strings = {
    table: {
        header: [
            "Currency",
            "Current Price (USD)",
            "Previous Price (USD)"
        ]
    },
    button: "Update Prices"
}

function Table(){ 
    const rates = useCoinbase()
    const [, setUpdate] = useState<number | null>()
    spotPriceCache.onUpdate = function(id: string, value: string){
        this.current[id] = value        
        setUpdate(Date.now())
    }

    spotPriceCache.saveToLast = function(){
        Object.entries(this.current).forEach(entry => {
            if(this.current[entry[0]])
                this.last[entry[0]] = this.current[entry[0]]
        })
        this.current = {}
        setUpdate(Date.now())
    }

    return (
        <SpotPriceContext.Provider value={spotPriceCache}>
            <table>
                <thead>
                    <tr>
                        {strings.table.header.map(s => (
                            <th>
                                {s}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rates.map<JSX.Element>((currency: ExchangeItem) => 
                        <CurrentRow key={currency.id} {...currency} />
                    )}
                </tbody>
            </table>
            <div className="button-container">
                <button onClick={() => spotPriceCache.saveToLast()}>
                    {strings.button}
                </button>
            </div>
        </SpotPriceContext.Provider>            
    )
}

export default Table;