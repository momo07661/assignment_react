import DeleteUser from "../../components/DeleteUser";
import AddMoney from "../../components/AddMoney";
import {Navigate, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const AdminPage = ({isAdmin, token}) =>{
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAdmin || !token){
            navigate('/');
        }
        console.log(isAdmin);
    }, []);

    return(
        <>
            {!token && <Navigate to={'/'} />}
            <DeleteUser />
            <AddMoney />
        </>
    )
}