import { createContext, useState } from "react";
import Notification from "./Notification";

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notificationData, setNotificationData] = useState({
        type: 'Claro ue si campeon!',
        text: 'ya sumaste cositas al carrito!'
    })

    const showNotification = (type, text ) => {
        setNotificationData({type, text})
    }

    return (

        <NotificationContext.Provider value={{  showNotification }}>
            { notificationData.text && <Notification notificacionData={notificationData}/> }
            { children }
        </NotificationContext.Provider>
    )
}