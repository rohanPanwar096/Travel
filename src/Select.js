import React,{useContext, useState} from 'react';
import {RangeContext} from "./App"

export default function Select() {

    const [range,setRange] = useState(useContext(RangeContext)["state"]);
    const contextVal = useContext(RangeContext)["updateRange"];
    const handleChange = (event)  => {
        setRange(event.target.value);
        contextVal(event.target.value)
    }

    return (
        <div>
            <select value={range} onChange={handleChange}>
            <option value="Sort-By">Sort By</option>
            <option value="ascending">Low-High</option>
            <option value="descending">High-Low</option>
            </select>
        </div>
    )
}
