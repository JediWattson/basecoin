import React, {useContext, useState} from "react";
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

function Table() {
    const rates = useCoinbase()

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Currency
                    </th>
                    <th>
                        Current Price (USD)
                    </th>
                    <th>
                        Previous Price (USD)
                    </th>
                </tr>
            </thead>
            <tbody>
                {rates.map<JSX.Element>((currency: ExchangeItem) => 
                    <CurrentRow key={currency.id} {...currency} />
                )}
            </tbody>
        </table>
    )
}

function withContext(){ 
    const [, setUpdate] = useState<number | null>()
    spotPriceCache.onUpdate = function(id: string, value: string){
        this.current[id] = value        
        setUpdate(Date.now())
    }

    spotPriceCache.saveToLast = function(){
        this.last = {...this.current}
        this.current = {}                
        setUpdate(Date.now())
    }

    return (
        <SpotPriceContext.Provider value={spotPriceCache}>
            <Table />
            <button onClick={() => spotPriceCache.saveToLast()}>
                press me
            </button>
        </SpotPriceContext.Provider>            
    )
}

export default withContext;