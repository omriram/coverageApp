import React, { Component } from 'react';
import CustomField from "../custom-field/custom-field.component";
import FieldNotification from "../field-notification/field-notification.component";
import FieldValidator from "../../field-validator";
import "./coverage-form.styles.scss";
import "../../shared-styles.scss";

const defauleSourcesList = ["news", "blogs", "discussions", "reviews"];

class CoverageForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            domain: "",
            sourceType: "news",
            sourceCountry: "Afghanistan",
            reason: "",
            emailNotification: "",
            domainNotification: "",
            alertNewInsert: false,
            citiesList: [],
            sourcesList: defauleSourcesList
        }
    }

    onInputChange = (e) => {
        switch(e.target.type) {
            case "email":
                this.setState({email: e.target.value,  emailNotification: ""});
                break;
            case "text":
                this.setState({domain: e.target.value, domainNotification: ""});
                break;
            case "textarea":
                this.setState({reason: e.target.value})
                break;
            default:
                break;
            
        }
    }


    onClickSubmitButton = () => {
        
        let emailNotification = "", domainNotification = "";
        const {email, domain} = this.state;

        FieldValidator.validateUniqueDomainPerEmail(email,domain)
        .then(isDomainFound => { 
            let valid = true;
            emailNotification = FieldValidator.runEmailValidators(email);
            domainNotification = FieldValidator.runDomainValidators(domain);

            if(emailNotification !== "") {
                this.setState({emailNotification});
                document.getElementById("emailField").focus();
                valid = false;
            
            }
            if(domainNotification !== "") {
                this.setState({domainNotification});
                document.getElementById("emailField").focus();
                valid = false;
               
            }
            else if(isDomainFound) {
                this.setState({domainNotification: 
                "This domain has already being requested by that email before",
                notifications: true});
                document.getElementById("emailField").focus();
                valid = false; 
            
            }
            if(valid) {              
                const dataPack = {
                    email: email,
                    domain: domain,
                    sourceType: this.state.sourceType,
                    sourceCountry: this.state.sourceCountry,
                    reason: this.state.reason,
                }
              
                fetch("http://127.0.0.1:3001/addRecord", {
                    method: "post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(dataPack)
                }).then(() => {      
                    
                    this.setState({alertNewInsert: true,
                     emailNotification: "",
                     domainNotification: ""});
                     });
                   
           
        }

    });

}

    onSelectClick = (e) => {
        switch(e.target.name) {
            case "source":
                this.setState({sourceType: e.target.value})
                break;
            case "country":
                this.setState({sourceCountry: e.target.value})
                break;
            default:
                break;
        }
    }

    onClickButtonReqSuc = () => {
        window.location.reload();
    }

    componentDidMount() {
        this.setState({citiesList: this.props.citiesList});
    }

    render() { 
        return ( 
        <div className="coverage-form">
           <CustomField label={"Your Email"} onInputChange={this.onInputChange} />
           <FieldNotification msg={this.state.emailNotification} field={"email"}/>
           <CustomField label={"Domain Name"} onInputChange={this.onInputChange}/>
           <FieldNotification msg={this.state.domainNotification} field={"domain"}/>
           <CustomField label={"Source Type"} options={this.state.sourcesList} onSelectClick ={this.onSelectClick}/>
           <CustomField label={"Source Country"} options={this.state.citiesList} onSelectClick ={this.onSelectClick}/>
           <CustomField label={"Reason"} onInputChange={this.onInputChange}/>
           <button className="btn coverage-form__btn" onClick={this.onClickSubmitButton}>submit</button>
            {this.state.alertNewInsert && 
                <div className="coverage-form__req-succ">
                   <span>Request Created Successfully!</span> 
                   <button onClick={this.onClickButtonReqSuc} className="btn coverage-form__btn-req">ok</button>
                </div>
            }
        </div> );
    }
}
 
export default CoverageForm;