import React,{useState,useEffect} from 'react';
import "./customer.css";

export default function Customer({name,avatarUrl,email,phone,hasPremium,bids}) {
    const [maxBid,setMaxBid] = useState("");
    console.log("BIDS",bids)
 

    useEffect(() => {
        let largestBid= bids.length === 1 ? bids[0]["amount"] : "";
        for(let i=0; i< bids.length; i++) {
            console.log("Bids",bids[i])
            for(let j=0; j<bids.length; j++) {
                console.log("bids nested",bids[j],bids[i])
                if(bids[j]["amount"] > bids[i]["amount"]) {
                    console.log("Greatest Bid",bids[j]["amount"])
                    largestBid = bids[j]["amount"]
                }
            }
        }
        setMaxBid(largestBid)
    },[bids])

   


    return (
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
            <div className="bid_value">
                <p>{maxBid}</p>
            </div>
        </div>
    )
}
