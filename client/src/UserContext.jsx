import { createContext, useState } from "react"

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null)
    const [userLogged, setUserLogged] = useState(false)

    return (
        <UserContext.Provider value={{userInfo, setUserInfo, userLogged, setUserLogged}}>
            {children}
        </UserContext.Provider>
    )
}