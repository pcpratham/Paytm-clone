import axios from 'axios'
import React, { useEffect, useState } from 'react'







export const Balance = () => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {

        axios.get(`${import.meta.env.VITE_SOME_KEY}` +"/api/v1/account/balance", {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => setBalance(response.data.balance))

    }, [balance]);
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}