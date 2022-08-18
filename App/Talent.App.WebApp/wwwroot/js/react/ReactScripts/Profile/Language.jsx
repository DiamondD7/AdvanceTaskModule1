/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';


export default class Language extends React.Component {
    constructor(props) {
        super(props);
                const details = this.props.details ?
                    Object.assign({}, props.details)
                    : {
                        name:"",
                        level:""
                    }

        this.state = {
            showEditSection: false,
            newContact: details,
            load:[]

        }

        this.renderEdit = this.renderEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveDetails = this.saveDetails.bind(this);
        this.addLanguage = this.addLanguage.bind(this);
    }


    closeEdit() {
        this.setState({ showEditSection: false })
    }

    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({ showEditSection: true, newContact: details })
    }


    handleChange(event) {
        const data = Object.assign({}, this.state.newContact);
        data[event.target.name] = event.target.value;
        this.setState({
            newContact: data
        })
    }

    saveDetails() {
        console.log("this is the new contact in saveDetails: ", this.state.newContact);
        const data = Object.assign({}, { Name: this.state.newContact.name, Level: this.state.newContact.evel })
        this.props.controlFunc(data)
        this.closeEdit()
    }

    addLanguage() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(this.state.newContact.name, this.state.newContact.level),
            success: function (res) {
                console.log(res)
                console.log("this is the name: ", this.state.newContact.name);
                console.log("this is the level: ", this.state.newContact.level);
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    console.log(res.state);
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    renderEdit() {
        let selectedItem = this.state.newContact.level;
        let langInput = this.state.newContact.name;
        return (
            <div className="sixteen wide column">
                {/*<div className="fields">*/}
                    <div className="five wide field">
                        <input
                            type="text"
                            placeholder="Add Language"
                            name="name"
                            value={langInput || ''}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="five wide field">

                        <select className="ui right labeled dropdown" placeholder="Level" value={selectedItem || ''} name="level" onChange={this.handleChange}>
                            <option value="">Language Level</option>
                            <option>Basic</option>
                            <option>Conversational</option>
                            <option>Fluent</option>
                            <option>Native/Bilingual</option>
                        </select>
                    </div>

                    <button type="button" className="ui teal button" onClick={this.saveDetails}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                {/*</div>*/}
            </div>
        )
    }



    render() {
        return (
            <FormItemWrapper
                title='Languages'
                tooltip='Select languages that you speak'
            >
                {this.state.showEditSection ? this.renderEdit() : ""}
                <table className="ui table">
                    <thead className="full-width">
                        <tr>
                            <th>Language</th>
                            <th>Level</th>
                            <th>
                                <button type="button" className="ui right floated teal button" onClick={this.openEdit}>
                                    <i className="plus icon"></i> Add User
                                </button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.details.map((items, index) =>
                            <tr key={index}>
                                <td>{items.Name !== null ? items.Name : "NULL"}</td>
                                <td>{items.Level !== null ? items.Level : "NULL"}</td>
                                <td></td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </FormItemWrapper>


        )

    }
}
