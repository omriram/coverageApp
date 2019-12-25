import React from 'react'
import "./record.styles.scss";

const Record = ({recordObj, bgColor, onClickDelete}) => {
    return ( 
        <div className={`record ${bgColor}`}>
            <span className="record__col record__col--email">{recordObj.email}</span>
            <span className="record__col record__col--domain">{recordObj.domain}</span>
            <span className="record__col record__col--source-type">{recordObj.source_type}</span>
            <span className="record__col record__col--source-country">{recordObj.source_country}</span>
            <span className="record__col record__col--reason">{recordObj.reason}</span> 
            {bgColor === "topics" ?
            <span className="record__col">delete</span> :
            <button onClick={() => onClickDelete(recordObj.email, recordObj.domain)} 
            className="btn record__btn-delete">&#10006;
            </button> }
        </div>
     );
}
 
export default Record;