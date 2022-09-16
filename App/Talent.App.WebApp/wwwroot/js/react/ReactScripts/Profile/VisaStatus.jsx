import React from 'react'
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        const details = props.details ? Object.assign({}, props.details) : { visaStatus: '', visaExpiryDate: '' }


        this.state = {
            showEditSection: false,
            newContact: details
        }
        this.handleChange = this.handleChange.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }

    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newContact: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    saveContact() {
        console.log("this is the visastatus:", this.state.newContact.visaStatus);
        console.log("this is the visaexpiry:", this.state.newContact.visaExpiryDate);
        this.setState({ stringDate: this.state.newContact.visaExpiryDate })
        const data = Object.assign({}, this.state.newContact)

        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()

    }

    renderEdit() {
        return (
            <div className="ui sixteen wide column">
                <div className="two fields">
                    <div className="twelve wide field">

                        <label>Visa type</label>
                        <select className="ui right labeled dropdown" placeholder="Visa type" value={this.state.newContact.visaStatus || ''} name="visaStatus" onChange={this.handleChange}>
                            <option value="">Visa type</option>
                            <option>Citizen</option>
                            <option>Permanent Resident</option>
                            <option>Work Visa</option>
                            <option>Student Visa</option>
                        </select>

                    </div>

                    {this.state.newContact.visaStatus == 'Student Visa' || this.state.newContact.visaStatus == 'Work Visa' ?
                        <div className="seven wide field">
                            <ChildSingleInput
                                inputType="text"
                                label="Visa expiry date"
                                name="visaExpiryDate"
                                placeholder="DD/MM/YYYY"
                                controlFunc={this.handleChange}
                                maxLength={80}
                                errorMessage="Please enter a valid date"
                            />
                        </div>
                        : ""}

                </div>


                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        const date = this.formatDate(this.props.details.visaExpiryDate);
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        {this.props.details.visaStatus == 'Citizen' || this.props.details.visaStatus == 'Permanent Resident' ? <p> Visa type: {this.props.details.visaStatus}</p> :
                            <div>
                                <p>Visa type: {this.props.details.visaStatus}</p>
                                <p>Visa Expiry Date: {date}</p>
                            </div>}
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

    formatDate(string) {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    render() {

        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
}