import React from 'react';
import "./customer.css";

export default function Customer({name,avatarUrl,email,phone,hasPremium}) {
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
                <p>Max/Min Bid</p>
            </div>
        </div>
    )
}
