import React,{useContext, useState} from 'react';
import {RangeContext} from "./App"

export default function Select() {

    const [range,setRange] = useState(useContext(RangeContext)["state"]);
    const contextVal = useContext(RangeContext)["updateRange"]
    const handleChange = (event)  => {
        setRange(event.target.value);
        contextVal(event.target.value)
    }

    console.log("Selected Value",range)

    return (
        <div>
            <select value={range} onChange={handleChange}>
            <option value="Less than 1000">Less than 1000</option>
            <option value="1000-10000">1000-10000</option>
            <option value="10000-30000">10000-30000</option>
            <option value="30000-60000">30000-60000</option>
            <option value="More than 60000">More than 60000</option>
            </select>
        </div>
    )
}
