import React ,{useState} from 'react'
import AppContext from './AppContext'

export const AppState = ({children}) => {
    const [isMenu, setIsMenu] = useState(true)
  
  
    return (
        <AppContext.Provider value={{
            isMenu,
            setIsMenu
        }}>
            {children}
        </AppContext.Provider>
  )
}
