import React from 'react';
import Cookies from 'js-cookie';

export class Description extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: 0,
            summaryChars:0
        };
        this.update = this.update.bind(this);
        this.updateSumamry = this.updateSumamry.bind(this);
    };

    update(event) {
        let description = event.target.value.length;
        this.setState({
            characters: description
        })
    }

    updateSumamry(event) {
        let summary = event.target.value.length;
        this.setState({
            summaryChars: summary
        })
    }

    render() {
        const characterLimit = 530;
        const summaryLimit = 150;
        /*let characters = this.props.description ? this.props.description.length : 0;*/

        const {
            characters,
            summaryChars
        } = this.state;

        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Description</h3>
                    <div className="tooltip">Write a description of your company.</div>
                </div>
                <div className="ten wide column">
                    <div className="field" >
                        <input maxLength={summaryLimit} name="summary" placeholder="Please provide a short summary about yourself" onChange={this.updateSumamry} />
                        <p>Characters remaining: {summaryChars} / {summaryLimit}</p>
                    </div>
                    <div className="field" >
                        <textarea maxLength={characterLimit} name="Description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." onChange={this.update} ></textarea>
                    </div>
                    <p>Characters remaining : {characters} / {characterLimit}</p>
                </div>
            </React.Fragment>
        )
    }
}
