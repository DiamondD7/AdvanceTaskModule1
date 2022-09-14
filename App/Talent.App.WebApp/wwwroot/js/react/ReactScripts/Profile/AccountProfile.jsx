﻿import React from 'react';
import Cookies from 'js-cookie';
import SocialMediaLinkedAccount from './SocialMediaLinkedAccount.jsx';
import { IndividualDetailSection } from './ContactDetail.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Address, Nationality } from './Location.jsx';
import Language from './Language.jsx';
import Skill from './Skill.jsx';
import Education from './Education.jsx';
import Certificate from './Certificate.jsx';
import VisaStatus from './VisaStatus.jsx'
import PhotoUpload from './PhotoUpload.jsx';
import VideoUpload from './VideoUpload.jsx';
import CVUpload from './CVUpload.jsx';
import SelfIntroduction from './SelfIntroduction.jsx';
import Experience from './Experience.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import TalentStatus from './TalentStatus.jsx';
import { Description } from './Description.jsx';

export default class AccountProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profileData: {
                address: {
                    number: "",
                    suburb: "",
                    street: "",
                    postCode: 0,
                    city: "",
                    country: ""
                },
                nationality: '',
                education: [],
                languages: [],
                skills: [],
                experience: [],
                certifications: [],
                visaStatus: '',
                visaExpiryDate: '',
                profilePhoto: '',
                linkedAccounts: {
                    linkedIn: "",
                    github: ""
                },
                jobSeekingStatus: {
                    status: "",
                    availableDate: null
                }
            },
            loaderData: loaderData

        }

        this.updateWithoutSave = this.updateWithoutSave.bind(this);
        this.updateArrays = this.updateArrays.bind(this);
        this.updateExperienceArrays = this.updateExperienceArrays.bind(this);
        this.updateSkillArrays = this.updateSkillArrays.bind(this);
        this.updateAndSaveData = this.updateAndSaveData.bind(this);
        this.updateForComponentId = this.updateForComponentId.bind(this);
        this.updateForNewValues = this.updateForNewValues.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                /*console.log("res", res);*/
                /*this.loadLanguages;*/
                let profileData = null;
                if (res.data) {
                    profileData = res.data;
                    console.log("profdata", profileData);
                    console.log("get languages:", profileData.languages)
                }
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
        this.init()
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        })
    }

    updateArrays(newValues) {
        console.log("this is the newvalues, ", newValues.id);
        if (newValues.id === null) {
            let newProfile = Object.assign(this.state.profileData.languages, [...this.state.profileData.languages, newValues])
        }
        else {
            let updateProfile = Object.assign(this.state.profileData.languages, [...this.state.profileData.languages, newValues])
            /*for (var i = 0; i <= this.state.profileData.languages; i++) {
                if (this.state.profileData.languages[i].id === newValues.id) {
                }
            }*/
        }
        this.saveProfile();
        /*this.setState({
            profileData: { languages: newProfile }
        }, this.saveProfile)*/
    }

    updateSkillArrays(newValues) {
        if (newValues.id === null) {
            let newProfile = Object.assign(this.state.profileData.skills, [...this.state.profileData.skills, newValues])
        }
        else {
            let updateProfile = Object.assign(this.state.profileData.skills, [...this.state.profileData.skills, newValues])
        }
        this.saveProfile();
    }

    updateExperienceArrays(newValues) {
        if (newValues.id === null) {
            let newProfile = Object.assign(this.state.profileData.experience, [...this.state.profileData.experience, newValues])
        }
        else {
            let updateProfile = Object.assign(this.state.profileData.experience, [...this.state.profileData.experience, newValues])
        }
        this.saveProfile();
    }

    //updates component's state and saves data
    updateAndSaveData(newValues) {
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        }, this.saveProfile)
    }

    updateForComponentId(componentId, newValues) {
        this.updateAndSaveData(newValues)
        console.log("new one is ", newValues);
    }

    updateForNewValues(componentId, newValues) {
        let data = {};
        data[componentId] = newValues;
        console.log("data update: ", data);
        this.updateAndSaveData(data)
    }

    saveProfile() {
        var cookies = Cookies.get('talentAuthToken');
        
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(this.state.profileData),
            success: function (res) {
                console.log("this is the res", res.data);
                console.log("this is the profdata in saveProfile", this.state.profileData);
                this.loadData();
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

    render() {
        const profile = {
            firstName: this.state.profileData.firstName,
            lastName: this.state.profileData.lastName,
            email: this.state.profileData.email,
            phone: this.state.profileData.phone
        }
        console.log("THIS IS THE LANGUAGE: ", this.state.profileData.languages);
        return (
            <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui container">
                            <div className="profile">
                                <form className="ui form">
                                    <div className="ui grid">
                                        <FormItemWrapper
                                            title='Linked Accounts'
                                            tooltip='Linking to online social networks adds credibility to your profile'
                                        >
                                            <SocialMediaLinkedAccount
                                                details={this.state.profileData.linkedAccounts}
                                                controlFunc={this.updateForNewValues}
                                                componentId='linkedAccounts'
                                            />
                                        </FormItemWrapper>

                                        <Description

                                        />

                                        <FormItemWrapper
                                            title='User Details'
                                            tooltip='Enter your contact details'
                                        >
                                            <IndividualDetailSection
                                                controlFunc={this.updateForComponentId}
                                                details={profile}
                                                componentId="contactDetails"
                                            />
                                        </FormItemWrapper>

                                        <FormItemWrapper
                                            title='Address'
                                        >
                                            <Address
                                                details={this.state.profileData.address}
                                                controlFunc={this.updateForNewValues}
                                                componentId="address"
                                            />
                                        </FormItemWrapper>

                                        <FormItemWrapper
                                            title='Nationality'
                                        >
                                            <Nationality
                                                details={this.state.profileData.nationality}
                                                controlFunc={this.updateForComponentId}
                                            />
                                        </FormItemWrapper>

                                        <Language
                                            details={this.state.profileData.languages}
                                            controlFunc={this.updateArrays}
                                        />

                                        <Skill
                                            details={this.state.profileData.skills}
                                            controlFunc={this.updateSkillArrays}
                                        />

                                        <Experience
                                            details={this.state.profileData.experience}
                                            controlFunc={this.updateExperienceArrays}
                                        />

                                        <FormItemWrapper
                                            title='Visa Status'
                                            tooltip='What is your current Visa/Citizenship status?'
                                        >
                                            <VisaStatus
                                                visaStat={this.state.profileData.visaStatus}
                                                visaExp={this.state.profileData.visaExpiryDate}
                                                controlFunc={this.updateForComponentId}
                                            />
                                        </FormItemWrapper>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}
