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
                        Name: "",
                        Level:""
                    }

        this.state = {
            showEditSection: false,
            newContact: details,

        }

        this.renderEdit = this.renderEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveDetails = this.saveDetails.bind(this);
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
        console.log(this.state.newContact)
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(data)
        this.closeEdit()
    }

    renderEdit() {
        const selectedItem = this.state.newContact.Level;
        const langInput = this.state.newContact.Name;
        return (
            <div className="sixteen wide column">
                <div className="fields">
                    <div className="five wide field">
                        <input
                            type="text"
                            placeholder="Add Language"
                            name="Name"
                            value={langInput}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="five wide field">

                        <select className="ui right labeled dropdown" placeholder="Level" value={selectedItem} name="Level" onChange={this.handleChange}>
                            <option value="">Language Level</option>
                            <option>Basic</option>
                            <option>Conversational</option>
                            <option>Fluent</option>
                            <option>Native/Bilingual</option>
                        </select>
                    </div>

                    <button type="button" className="ui teal button" onClick={this.saveDetails}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
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
                        {this.props.data}
                    </tbody>
                </table>
            </FormItemWrapper>


        )

    }
}
