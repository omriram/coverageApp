import React from 'react'
import "./field-notification.styles.scss";
import "../../shared-styles.scss";


const FieldNotification = ({msg, field}) => {
    return ( 
        <div className={`notification notification__${field}`}>
            {msg}
        </div>
     );
}
 
export default FieldNotification;
