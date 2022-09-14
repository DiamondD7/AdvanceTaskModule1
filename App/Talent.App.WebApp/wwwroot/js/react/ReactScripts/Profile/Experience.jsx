/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
            company: "",
            position: "",
            id: "",
            responsibilities: "",
            start: "",
            end: "",
            showUpdateSection: false
        }

        this.renderUpdate = this.renderUpdate.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.openUpdate = this.openUpdate.bind(this);
        this.closeUpdate = this.closeUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addExperience = this.addExperience.bind(this);
        this.updateExperience = this.updateExperience.bind(this);
    };

    closeEdit() {
        this.setState({ showEditSection: false })
    }

    openEdit() {
        this.setState({ showEditSection: true, company: this.props.details.company, position: this.props.details.position, id: this.props.details.id, responsibilities: this.props.details.responsibilities, start: this.props.details.start, end: this.props.details.end })
    }

    openUpdate(exp) {
        this.setState({ showUpdateSection: true, company: exp.company, position: exp.position, id: exp.id, responsibilities: exp.responsibilities, start: exp.start, end: exp.end })
    }

    closeUpdate() {
        this.setState({ showUpdateSection: false })
    }

    handleChange(event) {
        if (event.target.name === "company") {
            this.setState({ company: event.target.value })
        } else if (event.target.name === "position") {
            this.setState({ position: event.target.value })
        }
        else if (event.target.name === "responsibilities") {
            this.setState({ responsibilities: event.target.value })
        }
        else if (event.target.name === "start") {
            this.setState({ start: event.target.value })
        } else {
            this.setState({ end: event.target.value })
        }
    }

    addExperience() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify({ company: this.state.company, position: this.state.position, responsibilities: this.state.responsibilities, start: this.state.start, end: this.state.end }),
            success: function (res) {
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

    updateExperience() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify({ company: this.state.company, position: this.state.position, id: this.state.id, responsibilities: this.state.responsibilities, start: this.state.start, end: this.state.end }),
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
        let startDate = this.state.start;
        let endDate = this.state.end;
        let companyInput = this.state.company;
        let positionInput = this.state.position;
        let responsibilitiesInput = this.state.responsibilities;
        return (
            <div className="sixteen wide column">
                <div className="fields">
                    <div className="twelve wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Company"
                            name="company"
                            placeholder="Company"
                            value={companyInput || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid company name"
                        />
                    </div>

                    <div className="twelve wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Position"
                            name="position"
                            placeholder="Position"
                            value={positionInput || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid position name"
                        />
                    </div>
  
                </div>
                <div className="fields">
                    <div className="twelve wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Start Date"
                            name="start"
                            placeholder="DD/MM/YYYY"
                            value={startDate || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid Date"
                        />
                    </div>
                    <div className="twelve wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="End Date"
                            name="end"
                            placeholder="DD/MM/YYYY"
                            value={endDate || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid Date"
                        />
                    </div>
                </div>

                <div className="fields">
                    <div className="sixteen wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Responsibilities"
                            name="responsibilities"
                            placeholder="eg. Developed web applications"
                            value={responsibilitiesInput || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid text"
                        />
                    </div>
                </div>
                <button type="button" className="ui teal button" onClick={this.addExperience}>Add</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderUpdate() {
        return (
            <div className="sixteen wide column">
                <div className="fields">
                    <div className="twelve wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Company"
                            name="company"
                            placeholder="Company"
                            value={this.state.company || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid company name"
                        />
                    </div>

                    <div className="twelve wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Position"
                            name="position"
                            placeholder="Position"
                            value={this.state.position || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid position name"
                        />
                    </div>

                </div>

                <div className="fields">
                    <div className="twelve wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Start Date"
                            name="start"
                            placeholder="DD/MM/YYYY"
                            value={this.state.start || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid Date"
                        />
                    </div>
                    <div className="twelve wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="End Date"
                            name="end"
                            placeholder="DD/MM/YYYY"
                            value={this.state.end || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid Date"
                        />
                    </div>
                </div>
                <div className="fields">
                    <div className="sixteen wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Responsibilities"
                            name="responsibilities"
                            placeholder="eg. Developed web applications"
                            value={this.state.responsibilities || ''}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            errorMessage="Please enter a valid text"
                        />
                    </div>
                </div>
                    <button type="button" className="ui teal button" onClick={this.updateExperience}>Update</button>
                    <button type="button" className="ui button" onClick={this.closeUpdate}>Cancel</button>
            </div>
        )
    }

    render() {
        return (
            <FormItemWrapper
                title='Work Experience'
                tooltip='Add your work experience'
            >
                {this.state.showEditSection ? this.renderEdit() : null}

                {this.state.showUpdateSection ? this.renderUpdate() : null}

                <table className="ui table">
                    <thead className="full-width">
                        <tr>
                            <th>Id</th>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Responsibilities</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>
                                <button type="button" className="ui right floated teal button" onClick={this.openEdit}>
                                    <i className="plus icon"></i> Add User
                                </button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {this.props.details.map((exp, index) =>
                            <tr key={index}>
                                <td>{exp.id}</td>
                                <td>{exp.company === null ? "NULL" : exp.company}</td>
                                <td>{exp.position === null ? "NULL" : exp.position}</td>
                                <td>{exp.responsibilities === null ? "NULL" : exp.responsibilities}</td>
                                <td>{exp.start === null ? "NULL" : exp.start}</td>
                                <td>{exp.end === null ? "NULL" : exp.end}</td>
                                <td>
                                    <button type="button" className="circular ui icon button" onClick={() => this.openUpdate(exp)}><i className="pencil alternate icon"></i></button>
                                    <button type="button" className="circular ui icon button" onClick={this.delLanguage}><i className="trash alternate icon"></i></button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </FormItemWrapper>
        )

    }
}
