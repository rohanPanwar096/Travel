import React,{useEffect,useState} from 'react';
import Customer from "./Customer";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import "./pagination.css"

export default function App() {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(2);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        async function fetchCustomers() {
            const response =  await axios.get("https://intense-tor-76305.herokuapp.com/merchants");
        const data = response.data;
        console.log("Whoe Response",data)
        const slice = data.slice(offset, offset + perPage);
        const postCustomer = slice.map(cust => <Customer 
            key={cust["id"]}
            name={cust["firstname"] + " " + cust["lastname"]}
            avatarUrl={cust["avatarUrl"]}
            email={cust["email"]}
            phone= {cust["phone"]}
            hasPremium={cust["hasPremium"]}
            bids={cust["bids"]}
            />
        )
            setData(postCustomer);
            setPageCount(Math.ceil(data.length / perPage))
        }
        fetchCustomers()
    },[offset])

    const handlePagination = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage)
    }
    
    console.log("Cust DAta",data)
    return (
        <div>
            {data}
            <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePagination}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
            />
        </div>
    )
}
