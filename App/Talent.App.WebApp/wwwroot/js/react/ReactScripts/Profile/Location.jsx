import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { countries } from '../Employer/common';

export class Address extends React.Component {
    constructor(props) {
        super(props)

        const details = props.details ?
            Object.assign({}, props.details)
            : {
                fulladd:"",
                number: "",
                suburb: "",
                street: "",
                postCode: 0,
                city: "",
                country: ""
            }

        this.state = {
            showEditSection: false,
            newContact: details,
            location: {
                country: "",
                city: ""
            }
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
/*        this.handleChangeLocation = this.handleChangeLocation.bind(this)
*/    }

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

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }

    saveContact() {
        console.log(this.props.componentId)
        console.log(this.state.newContact)
        console.log(this.state.location)
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()
    }

    /*handleChangeLocation(event) {
        var data = Object.assign({}, this.state.newContact);
        //required
        const name = event.target.name;
        let value = event.target.value;
        const id = event.target.id;

        data[name] = value;
        if (name == "country") {
            data["city"] = "";
        }
        var updateData = {
            target: { name: "newContact", value: data }
        }

        //update props here
        this.setState({ newContact: data })
    }*/


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.state.newContact.country;
        const selectedCity = this.state.newContact.city;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value=""> Select a town or city</option>
                {popCities}
            </select>
        }

        return (
            <div className='ui sixteen wide column'>
                <div className="fields">
                    <div className="four wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Number"
                            name="number"
                            value={this.state.newContact.number || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid address"
                        />
                    </div>
                    <div className="twelve wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Street"
                            name="street"
                            value={this.state.newContact.street || ''}
                            controlFunc={this.handleChange}
                            maxLength={200}
                            placeholder="Enter street name"
                            errorMessage="Please enter a valid street name"
                        />
                    </div>
                    <div className="five wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            value={this.state.newContact.suburb || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid suburb name"
                        />
                    </div>



                </div>
                <div className="two fields">

                    <div className="field">
                        <label>Country</label>
                        <select className="ui right labeled dropdown"
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                            name="country">

                            <option value="">Select a country</option>
                            {countriesOptions}
                        </select>


                    </div>
                    <div className="field">
                        <div style={{ marginTop: "23.6px" }}></div>
                        {citiesOptions}
                    </div>
                    <div className="five wide field">
                        <ChildSingleInput
                            inputType="number"
                            label="Post Code"
                            name="postCode"
                            value={this.state.newContact.postCode || 0}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid post code"
                        />
                    </div>
                </div>
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let add = this.props.details ? `${this.props.details.number}, ${this.props.details.street}, ${this.props.details.suburb}, ${this.props.details.postCode}` : '';
        let city = this.props.details ? this.props.details.city : "";
        let country = this.props.details ? this.props.details.country : "";
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {add}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        const details = props.details ?
            Object.assign({}, props.details)
            : {
                nationality: ""
            }
        this.state = {
            showEditSection: false,
            newContact: details
        }

        this.handleChange = this.handleChange.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.saveContact = this.saveContact.bind(this);
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

    renderEdit() {
        let countriesOptions = [];
        const selectedCountry = this.state.newContact.nationality;
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        return (
            <div className="sixteen wide coloumn">
                <div className="field">
                    <label>Country</label>
                    <select className="ui right labeled dropdown"
                        placeholder="Country"
                        value={selectedCountry}
                        onChange={this.handleChange}
                        name="nationality">

                        <option value="">Select a country</option>
                        {countriesOptions}
                    </select>
                    <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>

                </div>
            </div>
        )
    }

    renderDisplay() {
        let nationality = this.props.details ? this.props.details: "";
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Nationality: {nationality}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

    saveContact() {
        console.log(this.state.newContact.nationality)
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
}