import React,{useState,useEffect,useContext} from 'react';
import "./customer.css";
import {RangeContext} from "./App";

export default function Customer({name,avatarUrl,email,phone,hasPremium,bids,id}) {
    const [maxBid,setMaxBid] = useState("");
    const [showMax,setShowMax] = useState(true);
    const range = useContext(RangeContext);
    console.log("BIDS",bids);
    const [minBid,setMinBid] = useState("");

    console.log("Selected Context Value",range["state"])
    
    const toggleBid = () => {
        setShowMax(!showMax);
    }

    useEffect(() => {
        let largestBid= bids.length === 1 ? bids[0]["amount"] : !bids.length ? "No Bid Made" : "";
        let smallestBid = "";
        for(let i=0; i< bids.length; i++) {
            // console.log("Bids",bids[i])
            for(let j=0; j<bids.length; j++) {
                // console.log("bids nested",bids[j],bids[i])
                if(bids[j]["amount"] > bids[i]["amount"]) {
                    // console.log("Greatest Bid",bids[j]["amount"])
                    largestBid = bids[j]["amount"]
                }
                if(bids[j]["amount"] < bids[i]["amount"]) {
                    //console.log("Greatest Bid",bids[j]["amount"])
                    smallestBid = bids[j]["amount"]
                }
            }
        }
        setMaxBid(largestBid);
        setMinBid(smallestBid);
    },[bids])

    return (
        <>
        <button onClick={toggleBid}>{showMax ? "Minimum Bid": "Maximum Bid"}</button>
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
                <p>{hasPremium ? "Premium" : "Not Premium"}</p>
            </div>
            <div className="bid_value ">
                <p>{showMax ? maxBid : !minBid ? "--" : minBid}</p>
            </div>
        </div>
        </>
    )
}
