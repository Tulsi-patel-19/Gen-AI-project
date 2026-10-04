import { createContext ,useState  } from "react";


// store userdata + laoding situaltions ,loading or not something
// useEffect -> after react render my components , do this extra work 
export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    return (
        <AuthContext.Provider value = {{user , setUser ,loading , setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}