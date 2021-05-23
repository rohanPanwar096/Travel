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

    console.log("Selected Context Value",range["state"])
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
        console.log("Bids Arr",bids[i]["amount"])
        bidArr.push(bids[i]["amount"])
    }

    console.log("BIDS",bidArr);

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
                <p>{hasPremium ? "Premium" : "Free"}</p>
            </div>
            <div className="bid_value ">
                <p>{showMax ? maxBid : !minBid ? "--" : minBid}</p>
            </div>
        </div>
        <div>
        {ascending ? <p>{bidArr.sort((a,b) => {
            return a-b;
        })}</p> : descending ?  <p>{bidArr.sort((a,b) => {
            return b-a;
        })}</p> : null}
        </div>
        </>
    )
}
