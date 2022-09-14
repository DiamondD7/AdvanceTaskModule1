/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditSection: false,
            name: "",
            level: "",
            id: "",
            showUpdateSection: false
        }


        this.renderUpdate = this.renderUpdate.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.openUpdate = this.openUpdate.bind(this);
        this.closeUpdate = this.closeUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.updateSkills = this.updateSkills.bind(this);
    };

    closeEdit() {
        this.setState({ showEditSection: false })
    }

    openEdit() {
        this.setState({ showEditSection: true, name: this.props.details.name, level: this.props.details.level, id: this.props.details.id})
    }

    openUpdate(items) {
        this.setState({ showUpdateSection: true, name: items.name, level: items.level, id: items.id})
    }

    closeUpdate() {
        this.setState({ showUpdateSection: false })
    }

    handleChange(event) {
        if (event.target.name === "name") {
            this.setState({ name: event.target.value })
        } else {
            this.setState({ level: event.target.value })
        }
    }

    addSkill() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify({ name: this.state.name, level: this.state.level }),
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

    updateSkills() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateSkill',
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
        let skillInput = this.state.name;
        return (
            <div className="sixteen wide column">
                <div className="fields">
                    <div className="five wide field">
                        <input
                            type="text"
                            placeholder="Add Skill"
                            name="name"
                            value={skillInput || ""}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="five wide field">

                        <select className="ui right labeled dropdown" placeholder="Level" value={selectedItem || ""} name="level" onChange={this.handleChange}>
                            <option value="">Skill Level</option>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                        </select>
                    </div>

                    <button type="button" className="ui teal button" onClick={this.addSkill}>Save</button>
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
                            placeholder="Update Skill"
                            name="name"
                            value={this.state.name || ''}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="five wide field">

                        <select className="ui right labeled dropdown" placeholder="Level" value={this.state.level || ''} name="level" onChange={this.handleChange}>
                            <option value="">Skill Level</option>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                        </select>
                    </div>

                    <button type="button" className="ui teal button" onClick={this.updateSkills}>Update</button>
                    <button type="button" className="ui button" onClick={this.closeUpdate}>Cancel</button>
                </div>
            </div>
        )
    }

  
   render() {
       return (
           <FormItemWrapper
               title='Skills'
               tooltip='Select skills'
           >
               {this.state.showEditSection ? this.renderEdit() : ""}

               {this.state.showUpdateSection ? this.renderUpdate() : ""}

               <table className="ui table">
                   <thead className="full-width">
                       <tr>
                           <th>Id</th>
                           <th>Skill</th>
                           <th>Level</th>
                           <th>
                               <button type="button" className="ui right floated teal button" onClick={this.openEdit}>
                                   <i className="plus icon"></i> Add New
                               </button>
                           </th>
                       </tr>
                   </thead>

                   <tbody>

                       {this.props.details.map((skills, index) =>
                           <tr key={index}>
                               <td>{skills.id}</td>
                               <td>{skills.name === null ? "NULL" : skills.name}</td>
                               <td>{skills.level === null ? "NULL" : skills.level}</td>
                               <td>
                                   <button type="button" className="circular ui icon button" onClick={() => this.openUpdate(skills)}><i className="pencil alternate icon"></i></button>
                                   <button type="button" className="circular ui icon button"><i className="trash alternate icon"></i></button>
                               </td>
                           </tr>)}
                   </tbody>
               </table>
           </FormItemWrapper> 
           )
    }
}

