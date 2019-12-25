import React from 'react'
import "../../shared-styles.scss";
import "./custom-field.styles.scss";






const CustomField = ({label, onInputChange, options, onSelectClick}) => {
    const renderField = initFieldParams(label, options, onInputChange, onSelectClick);
    return ( 
        <div className="group-field">
            {renderField}
            <label className="group-field__label"> {label}</label>
        </div>
     );
}








const initFieldParams = (label, options, onInputChange, onSelectClick) => {
    let renderField;

    switch(label) {
        case "Your Email":
            renderField = <input type="email"
            id="emailField"
            className="group-field__input"
            placeholder="example@mail.com"
            onChange={onInputChange} />
            break;
        case "Domain Name":
            renderField = <input type="text"
            id="domainField"
            className="group-field__input"
            placeholder="example.com"
            onChange={onInputChange}/>
            break;            
        case "Source Type":
            renderField = <select name="source" onChange={onSelectClick} className="group-field__input pointer">
                                {options.map(option => <option key={option} value={option}>{option}</option> )}
                          </select>
            break;   
        case "Source Country":
            renderField = <select name="country" onChange={onSelectClick} className="group-field__input pointer">
                                {options.map(option => <option key={option} value={option}>{option}</option> )}
                          </select>
            break;   
        case "Reason":
            renderField =  <textarea type="textarea" 
            id="reasonField"
            className="reason"
            maxLength="355"
            placeholder="Reason should be under 355 characters"
            onChange={onInputChange}/>
            break;   
        default:
            break;
    }

    return renderField;
}
 
export default CustomField;