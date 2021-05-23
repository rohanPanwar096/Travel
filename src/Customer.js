import React,{useState,useEffect,useContext} from 'react';
import "./customer.css";
import {RangeContext} from "./App";

export default function Customer({name,avatarUrl,email,phone,hasPremium,bids,id}) {
    const [maxBid,setMaxBid] = useState("");
    const [showMax,setShowMax] = useState(true);
    const range = useContext(RangeContext);
    let ascending = false;
    let descending = false;
    let bidArr = [];
    const [minBid,setMinBid] = useState("");

    //console.log("Selected Context Value",range["state"])
    if(range["state"] === "ascending") {
        ascending = true;
        descending = false;
    } 

    if(range["state"] === "descending") {
        descending = true;
        ascending = false;
    }
    const toggleBid = () => {
        setShowMax(!showMax);
    }

    for(let i=0; i<bids.length;i++) {
        //console.log("Bids Arr",bids[i]["amount"])
        bidArr.push(bids[i]["amount"])
    }

    console.log("BIDS",bids);

    bidArr.sort(function(a,b) {
        return a-b;
    })

    useEffect(() => {
        let largestBid= bids.length === 1 ? bids[0]["amount"] : !bids.length ? "No Bid Made" : "";
        let smallestBid = "";
        largestBid = bidArr[bidArr.length -1];
        smallestBid = bidArr[0];
        setMaxBid(largestBid);
        setMinBid(smallestBid);
    },[bids])

    return (
        <>
        <button onClick={toggleBid}>{showMax ? "Show Minimum Bid": "Show Maximum Bid"}</button>
        <div className="customer_container">
            
            <div className="cust_name">
                <p>{name}</p>
                <img src={avatarUrl} alt="Customer Avatar"/>
            </div>
            <div className="cust_email">
                <p>{email}</p>
            </div>
            <div>
                <p>{phone}</p>
            </div>
            <div>
                <p>{hasPremium ? "Premium" : "Free"}</p>
            </div>
            <div className="bid_value ">
                <p>{showMax ? maxBid : !minBid ? "--" : minBid}</p>
            </div>
        </div>
        <div className="text-center">
           
        {ascending ? 
        <p className="col"><span className="heading_bid">Bid Amounts by {name}</span>{bidArr.sort((a,b) => a-b
        ).map((item,i) => <span key={i}>{item}</span>)}</p> : descending ?  <p className="col"><span className="heading_bid">Bid Amounts by {name}</span>{bidArr.sort((a,b) => b-a
            ).map((item,i) => <span key={i}>{item}</span>)}</p> : null}
        </div>
        </>
    )
}
