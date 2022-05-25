import React from "react";
import useCoinbase from "../../lib/useCoinbase"
import useSpotPrice from '../../lib/useSpotPrice'
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
                N/A
            </td>
        </tr>
    )
}

function Table(){
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

export default Table;