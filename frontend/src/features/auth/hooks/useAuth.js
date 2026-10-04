import { useContext  , useEffect} from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, logout, register, getme } from "../services/auth.api.js";

// hooks
// manage => state + api 
// state -> stored user data
// api-> after calling of api stored the response or handle the response ,of api in hooks 

export const useAuth = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true) //loading here , loading bcs api fetch can take time so to showcase the user to loading the data

        try {

            const data = await login({ email, password }) //calling api , store data

            setUser(data.user); //return a user , and set user here
            return true;
        } catch (err) {
            console.log("Login failed:",err);

            return false;

        } finally {
            setLoading(false) //loading complete , false it

        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)

        try {

            const data = await register({ username, email, password })

            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)

        }
    }


    const handleLogout = async () => {
        setLoading(true)

        try {
            const data = await logout()
            setUser(null)
        } catch (err) {

        } finally {

            setLoading(false)
        }

    }


    useEffect(()=>{
    
            const getAndsetUser = async () =>{
                try{
    
                    console.log("calling getme..")
                    const data = await getme()
    
                    console.log("getme response  :" , data);
                    setUser(data.user)
                }catch(err){
                    console.log("getme error: ",err);
                    setUser(null)
                }finally{
                    console.log("finsh call")
                    setLoading(false)
                }
            };
        
            getAndsetUser();
        },[])


    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout
    }

}