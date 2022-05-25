import React from "react";
import useCoinbase, { ExchangeItem, useSpotPrice } from "../../lib/useCoinbase"

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