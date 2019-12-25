import React from 'react'
import "./record.styles.scss";

const Record = ({recordObj, bgColor, onClickDelete}) => {
    let reasonShort;

    if(recordObj.reason.length > 20) {
        reasonShort = `${recordObj.reason.slice(0, 20)}...`;
    } else {
        reasonShort = recordObj.reason;
    }

    return ( 
        <div className={`record ${bgColor}`}>
            <span className="record__col record__col--email">{recordObj.email}</span>
            <span className="record__col record__col--domain">{recordObj.domain}</span>
            <span className="record__col record__col--source-type">{recordObj.source_type}</span>
            <span className="record__col record__col--source-country">{recordObj.source_country}</span>
            <span className="record__col record__col--reason">{reasonShort}</span> 
            {bgColor === "topics" ?
            <span className="record__col">delete</span> :
            <button onClick={() => onClickDelete(recordObj.email, recordObj.domain)} 
            className="btn">&#10006;
            </button> }
        </div>
     );
}
 
export default Record;