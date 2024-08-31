import Login from "../../components/Login";
import React from "react";
import Buy from "../../components/Buy";
import Sell from "../../components/Sell";
import Quote from "../../components/Quote";
import History from "../../components/History";
import Register from "../../components/Register";
import UserBalance from "../../components/UserBalance";

export const HomePage = ({setToken, token, setIsAdmin, isAdmin}) => {

    return(
        <>
            {
                token
                    ?  <>
                        <UserBalance />
                        <Buy />
                        <Sell />
                        <Quote />
                        <History />
                    </>
                    :<>
                        <Login setToken={setToken} token={token} setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>
                        <Register />
                    </>

            }
        </>
    )
}