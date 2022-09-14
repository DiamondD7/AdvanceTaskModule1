/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Button, Modal } from "semantic-ui-react";

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
            name: "",
            level: "",
            id: "",
            currentUserId: "",
            showUpdateSection: false
        }

        this.renderEdit = this.renderEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.openUpdate = this.openUpdate.bind(this);
        this.closeUpdate = this.closeUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderUpdate = this.renderUpdate.bind(this);
        /*this.saveDetails = this.saveDetails.bind(this);*/
        this.addLanguage = this.addLanguage.bind(this);
        this.delLanguage = this.delLanguage.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        /*this.deleteClick = this.deleteClick.bind(this);*/
    }


    closeEdit() {
        this.setState({ showEditSection: false })
    }

    openEdit() {
        /*const details = Object.assign({}, this.props.details)*/
        this.setState({ showEditSection: true, name: this.props.details.name, level: this.props.details.level, id: this.props.details.id, currentUserId: this.props.details.currentUserId })
    }

    openUpdate(items) {
        this.setState({ showUpdateSection: true, name: items.name, level: items.level, id: items.id, currentUserId: items.currentUserId })
    }

    closeUpdate() {
        this.setState({ showUpdateSection: false })
    }

    handleChange(event) {
        if (event.target.name == "name") {
            this.setState({ name: event.target.value })
        } else {
            this.setState({ level: event.target.value })
        }
        /*const data = Object.assign({}, this.state.newContact);
        data[event.target.name] = event.target.value;
        this.setState({
            newContact: data
        })*/
    }

    /*saveDetails() {
        *//*console.log("this is the new contact in saveDetails: ", this.state.newContact);
const data = Object.assign({}, { Name: this.state.newContact.name, Level: this.state.newContact.evel })
this.props.controlFunc(data)
this.closeEdit()*//*
                                                                        }*/

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
            data: JSON.stringify({ name: this.state.name, level: this.state.level }),
            success: function (res) {
                console.log("added language props", this.props.details);
                console.log("this is the name: ", this.state.name);
                console.log("this is the level: ", this.state.level);
                if (res.success == true) {
                    this.props.controlFunc(res.data)
                    this.closeEdit();
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

    /*deleteClick(items) {
        this.setState({
            id: items.id,
            name: items.name,
            level: items.level
        }, this.delLanguage(this.state.id))
        
    }*/

    delLanguage() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            success: function (res) {
                if (res.success == true) {
                    this.props.controlFunc(res.data)
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

    updateLanguage() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify({ name: this.state.name, level: this.state.level, id: this.state.id }),
            success: function (res) {
                if (res.success == true) {
                    this.props.controlFunc(res.data)
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
        let selectedItem = this.state.level;
        let langInput = this.state.name;
        return (
            <div className="sixteen wide column">
                <div className="fields">
                    <div className="five wide field">
                        <input
                            type="text"
                            placeholder="Add Language"
                            name="name"
                            value={langInput || ""}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="five wide field">

                        <select className="ui right labeled dropdown" placeholder="Level" value={selectedItem || ""} name="level" onChange={this.handleChange}>
                            <option value="">Language Level</option>
                            <option>Basic</option>
                            <option>Conversational</option>
                            <option>Fluent</option>
                            <option>Native/Bilingual</option>
                        </select>
                    </div>

                    <button type="button" className="ui teal button" onClick={this.addLanguage}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </div>
        )
    }

    renderUpdate() {
        return (
            <div className="sixteen wide column">
                <div className="fields">
                    <div className="five wide field">
                        <input
                            type="text"
                            placeholder="Add Language"
                            name="name"
                            value={this.state.name || ''}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="five wide field">

                        <select className="ui right labeled dropdown" placeholder="Level" value={this.state.level || ''} name="level" onChange={this.handleChange}>
                            <option value="">Language Level</option>
                            <option>Basic</option>
                            <option>Conversational</option>
                            <option>Fluent</option>
                            <option>Native/Bilingual</option>
                        </select>
                    </div>

                    <button type="button" className="ui teal button" onClick={this.updateLanguage}>Update</button>
                    <button type="button" className="ui button" onClick={this.closeUpdate}>Cancel</button>
                </div>
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

                {this.state.showUpdateSection ? this.renderUpdate() : ""}

                <table className="ui table">
                    <thead className="full-width">
                        <tr>
                            <th>Id</th>
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
                                <td>{items.id}</td>
                                <td>{items.name === null ? "NULL" : items.name}</td>
                                <td>{items.level === null ? "NULL" : items.level}</td>
                                <td>
                                    <button type="button" className="circular ui icon button" onClick={() => this.openUpdate(items)}><i className="pencil alternate icon"></i></button>
                                    <button type="button" className="circular ui icon button" onClick={this.delLanguage}><i className="trash alternate icon"></i></button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </FormItemWrapper>


        )

    }
}
