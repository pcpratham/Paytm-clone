import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Appbar = () => {
    const [firstName,setFirstName] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_SOME_KEY}` +"/api/v1/user/self",{
            headers:{
                authorization : "Bearer " + localStorage.getItem("token")
            }
        }).then(response=>setFirstName(response.data.data.firstName))
        .catch(err=>{console.log("Error aagya h guyss!!")})
    },[firstName]);

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex gap-4 ">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {firstName[0]?.toUpperCase()}
                </div>
            </div>
            <div className="flex items-center justify-center my-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                <button className=" text-center " onClick={()=> {
                    localStorage.removeItem("token");
                    navigate("/signin");
                }} >
                    Logout
                </button>
            </div>
        </div>
    </div>
}