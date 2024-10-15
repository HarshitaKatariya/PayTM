import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
            .then(response => {
                setUsers(response.data.user);
                console.log(response.data.user[0]);  // This should show the first user in the console
            })
            .catch(error => {
                console.error("Error fetching users", error);
            });
    }, [filter]);

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input onChange={(e) => {
                    setFilter(e.target.value);
                    console.log(e.target.value);  // This should log the current filter value in the console
                }}
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-2 py-1 border rounded border-slate-200" 
                />
            </div>
            <div>
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <User key={user.id || index} user={user} />
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstname ? user.firstname[0].toUpperCase() : "?"}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>{user.firstname || "Unknown"} {user.lastname || "User"}</div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button onClick={(e) => { 
                    navigate("/send?id="+user.id+"&name="+user.firstname);
                }} label={"Send Money"} />
            </div>  
        </div>
    );
}
