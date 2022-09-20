import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props)
        const details = props.details ? Object.assign({}, props.details)
            : {
                status: "",
                availableDate: ""
            }
        this.state = {
            newContact: details
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveContact = this.saveContact.bind(this);
    }


    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        }, this.saveContact)
    }

    saveContact() {
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(this.props.componentId, data)
    }

    formatDate(string) {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }


    render() {
        const date = this.formatDate(this.props.details.availableDate);
        return (
            <div className="ui form">
                <div className="field">
                    <strong>Current Status</strong>
                </div>
                <div className="field">
                    <div className="ui checked radio checkbox">
                        <input type="radio" name="status" value="Actively looking for a job"
                            onChange={this.handleChange}
                            checked={this.props.details.status === 'Actively looking for a job'}
                        />
                        <label>Actively looking for a job</label>
                    </div>
                </div>
                <div className="field">
                    <div className="ui checked radio checkbox">
                        <input
                            type="radio"
                            name="status"
                            value="Not looking for a job at the moment"
                            onChange={this.handleChange}
                            checked={this.props.details.status === 'Not looking for a job at the moment'}
                        />
                        <label>Not looking for a job at the moment</label>
                    </div>
                </div>

                <div className="field">
                    <div className="ui checked radio checkbox">
                        <input
                            type="radio"
                            name="status"
                            value='Currently employed but open to offers'
                            checked={this.props.details.status === 'Currently employed but open to offers'}
                            onChange={this.handleChange}
                        />
                        <label>Currently employed but open to offers</label>
                    </div>
                </div>

                <div className="field">
                    <div className="ui checked radio checkbox">
                        <input
                            type="radio"
                            name="status"
                            value='Will be available on later date'
                            checked={this.props.details.status === 'Will be available on later date'}
                            onChange={this.handleChange}
                        />
                        <label>Will be available on later date</label>
                    </div>
                    {this.props.details.status === 'Will be available on later date' ?
                        this.props.details.availableDate !== null ? <p style={{ paddingLeft: '25px', paddingTop: '10px' }}>Available Date:<strong><em>{date}</em></strong></p> :
                        <input type="date" name="availableDate" value={this.state.newContact.availableDate} onChange={this.handleChange} />
                         : ""
                    }

                </div>

            </div>
        )
    }
}