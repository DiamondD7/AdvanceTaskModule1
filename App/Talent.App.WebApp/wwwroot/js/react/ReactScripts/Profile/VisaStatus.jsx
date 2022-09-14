import React from 'react'
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        const visaStatus = props.visaStat ? Object.assign({}, props.visaStat) : { visaStatus: '' }
        const visaExpired = props.visaExp ? Object.assign({}, props.visaExp) : { visaExpiryDate: '' }

        this.state = {
            showEditSection: false,
            newVisaStatus: visaStatus,
            newVisaExpiryDate: visaExpired
        }
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeExpiry = this.handleChangeExpiry.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveContact = this.saveContact.bind(this);
    }

    handleChangeStatus(event) {
        const data = Object.assign({}, this.state.newVisaStatus)
        data[event.target.name] = event.target.value
        this.setState({
            newVisaStatus: data
        })
    }

    handleChangeExpiry(event) {
        const data = Object.assign({}, this.state.newVisaExpiryDate)
        data[event.target.name] = event.target.value
        this.setState({
            newVisaExpiryDate: data
        })
    }

    openEdit() {
        const status = Object.assign({}, this.props.visaStat)
        const expiry = Object.assign({}, this.props.visaExp)
        this.setState({
            showEditSection: true,
            newVisaStatus: status,
            newVisaExpiryDate: expiry
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    saveContact() {
        console.log("this is the visastatus:", this.state.newVisaStatus.visaStatus);
        console.log("this is the visaexpiry:", this.state.newVisaExpiryDate.visaExpiryDate);
        const statusdata = Object.assign({}, this.state.newVisaStatus);
        const expiredData = Object.assign({}, this.state.visaExpiryDate);
        this.props.controlFunc(this.props.componentId, statusdata)
        this.props.controlFunc(this.props.componentId, expiredData)
        this.closeEdit()
    }

    renderEdit() {
        return (
            <div className="ui sixteen wide column">
                <div className="two fields">
                    <div className="twelve wide field">

                        <label>Visa type</label>
                        <select className="ui right labeled dropdown" placeholder="Visa type" value={this.state.newVisaStatus.visaStatus || ""} name="visaStatus" onChange={this.handleChangeStatus}>
                            <option value="">Visa type</option>
                            <option>Citizen</option>
                            <option>Permanent Resident</option>
                            <option>Work Visa</option>
                            <option>Student Visa</option>
                        </select>

                    </div>

                    <div className="twelve wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Visa expiry date"
                            name="visaExpiryDate"
                            placeholder="DD/MM/YYYY"
                            value={this.state.newVisaExpiryDate.visaExpiryDate || ''}
                            controlFunc={this.handleChangeExpiry}
                            maxLength={80}
                            errorMessage="Please enter a valid date"
                        />
                    </div>
                </div>


                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        const temp =
            <div>
                <p>Visa type: {this.state.newVisaStatus.visaStatus}</p>
                <p>Visa Expiry Date: {this.state.newVisaExpiryDate.visaExpiryDate}</p>
            </div>
            ;
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        {this.state.newVisaStatus.visaStatus === 'Citizen' || 'Permanent Resident' ? <p> Visa type: {this.state.newVisaStatus.visaStatus}</p> : temp}
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.state.showEditSection ? this.renderEdit() : this.renderDisplay()}
            </div>
        )
    }
}