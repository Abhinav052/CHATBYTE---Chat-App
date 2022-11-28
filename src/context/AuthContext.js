import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext } from 'react'
import { auth } from '../firebase';


export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState({});
    React.useEffect(() => {
        const checkAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            console.log(user)
        })

        return () => {
            checkAuth()
        }
    }, []);

    return (<AuthContext.Provider value={{ currentUser }}> {children}</ AuthContext.Provider>)
}
