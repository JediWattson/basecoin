import { Console } from "console";
import React from "react";
import withData from "../../lib/withData"

function Table(){
    const rates = withData()
    rates?.forEach(r => console.log(r[1]))

    return (
        <div>
            Testing
        </div>
    )
}

export default Table;