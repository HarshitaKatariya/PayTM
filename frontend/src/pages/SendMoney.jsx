import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom"

export const SendMoney = () =>{
    const [searschParams] = useSearchParams();
    const id = searschParams.get("id");
    const name = searschParams.get("name");
    const [amount, setAmount] = useState(0);

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 flex rounded-full bg-green-500 items-center justify-center">
                        <h3 className="text-2xl text-white">{name[0].toUpperCase()}</h3>
                        </div>
                        <span className="text-2xl font-semibold">{name}</span>
                      
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed  peer-disabled:opacity-70" htmlFor="amount">
                                Amount (In Rs)
                            </label>
                            <input onChange={(e) => {
                                setAmount(e.target.value)
                            }} type="number" className=" flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm "
                            id="amount" placeholder="Enter amount" />
                        </div>
                        <button onClick={() => {
                            axios.post("http://localhost:3000/api/v1/account/transfer",{
                                to:id,
                                amount 
                            },{
                                headers: {
                                    Authorization : "Bearer " + localStorage.getItem("token")
                                } 
                            })

                            alert("Transaction Make successfully")
                        }} 
                        
                         className="w-full justify-center rounded-md text-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-colors h-10 px-4 py-2">
                Initiate Transfer
              </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}