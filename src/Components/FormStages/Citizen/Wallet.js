import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";


export default function Wallet() {
    const [authorisationUrl, setAuthorisationUrl] = useState("");

    useEffect(() => {
        async function fetchData () {
        const userUuid = '363ba2fd-f77c-4e95-b2a0-b034053512bc';
        const resp = await fetch(
          `http://172.17.242.127:1000/api/wallet/auth/j363ba2fd-f77c-4e95-b2a0-b034053512bc/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userUuid),
        })
        
        const response = await resp.json();
        console.log(response.data);
        window.location.replace(response.data.authorisationUrl);




        }
        fetchData()
    }, []);



    return (
        <div className="container">

        </div>
    );
}
