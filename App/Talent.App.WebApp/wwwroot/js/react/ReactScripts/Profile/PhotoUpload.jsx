/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        const details = props.details ? Object.assign({}, props.details)
            : {
                profilePhoto: ""
            }

        this.state = {
            showUploadSection: false,
            newContact: details
        }

        this.renderUpload = this.renderUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openUpload = this.openUpload.bind(this);
        this.closeUpload = this.closeUpload.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
    };

    openUpload() {
        const details = Object.assign({}, this.props.details);
        this.setState({ showUploadSection: true, newCotact: details })
    }

    closeUpload() {
        this.setState({ showUploadSection: false })
    }

    handleChange(e) {
        const data = Object.assign({}, this.state.newContact)

        let url = URL.createObjectURL(e.target.files[0]);
        data[e.target.name] = url
        this.setState({
            newContact: data
        })
    }

    savePhoto() {
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(this.props.componentId, data)
        this.closeUpload();
    }

    renderUpload() {
        return (
            <div>
                <input type="file" accept="image/png, image/jpeg" name="profilePhoto" onChange={this.handleChange} />
                <button type="button" className="ui right floated teal button" onClick={this.savePhoto}><i className="ui upload icon"></i>Upload</button>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.state.showUploadSection ? this.renderUpload() :
                    this.props.details === null ? 
                    <button type="button" onClick={this.openUpload} style={{ padding: '30px', borderRadius: '50%', backgroundColor: 'transparent' }}><i style={{ fontSize: '100px' }} className="ui camera retro icon"></i></button>
                        :
                        <button type="button" onClick={this.openUpload} style={{ border: 'none', backgroundColor: 'transparent' }}><img style={{ width: '200px', borderRadius: "50%" }} src={this.props.details} /></button>

                        }
            </div>
        )

    }
}
