import React, { Component } from 'react';
import Record from "../record/record.component";
import "./status-page.styles.scss";

class StatusPage extends Component {
    constructor() {
        super();
        this.state = {
            records: []
        }
    }

    onClickDelete = (email, domain) => {
        const dataPack = {
            email, 
            domain
        }
        fetch("https://coverage-api.herokuapp.com/deleteRecord", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dataPack)
        })
        .then(res => res.json())
        .then(records => this.setState({records}))
        .catch(err => console.log(err)); 
    }

    componentDidMount() {
        fetch("https://coverage-api.herokuapp.com")
        .then(res => res.json())
        .then(records => this.setState({records})); 
    }
    render() { 
        return (  
            <div className="status-page">
                <Record bgColor={"topics"} recordObj={{
                 email:"Email",
                 domain:"Domain",
                 source_type:"Source Type", 
                 source_country:"Source Country", 
                 reason:"Reason"}}/>
                {this.state.records.map((record,i) => {
                    
                    return <Record
                     onClickDelete={this.onClickDelete}
                     recordObj={record}
                     key={`${record.email}_+_${record.domain}`} />
                })}
            </div>
        );
    }
}
 
export default StatusPage;