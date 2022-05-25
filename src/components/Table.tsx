import React from "react";
import withData, { ExchangeItem } from "../../lib/withData"

import "../styles/table.css"

function Table(){
    const rates = withData()

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Currency
                    </th>
                    <th>
                        Exchange Rate (USD)
                    </th>
                    <th>
                        Price (USD)
                    </th>
                </tr>
            </thead>
            <tbody>
                {rates.map<JSX.Element>((currency: ExchangeItem) => {
                    return (
                        <tr key={currency.id}>
                            <td>
                                {currency.name}
                            </td>
                            <td>
                                {currency.value}
                            </td>
                            <td>
                                "n/a"
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table;