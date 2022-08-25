import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInfoDoctor } from '../../../services/userService';
import { has } from 'lodash';
import { CRUD_ACTIONS } from '../../../utils';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: {},
            description: '',
            listDoctor: [],
            hasOldData: false,
        }
    }

    componentDidMount() {
        this.props.getAllDoctorRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctorAllRedux !== this.props.doctorAllRedux) {
            this.setState({
                listDoctor: this.buildDataInputSelect(this.props.doctorAllRedux),
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData == true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        });
    }

    handleOnChangeDesc = (event) => {
        console.log('desc: ', event.target.value);
        this.setState({
            description: event.target.value,
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        let response = await getDetailInfoDoctor(selectedDoctor.value);
        this.setState({
            selectedDoctor
        });
        if (response && response.errCode === 0 && response.data && response.data.Markdown) {
            let markdown = response.data.Markdown;
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true,
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
            })
        }
    };

    buildDataInputSelect = (inputData) => {
        let selectArr = [];
        inputData.forEach((item, index) => {
            let selectItem = {};
            selectItem.label = `${item.firstName} ${item.lastName}`;
            selectItem.value = item.id;
            selectArr.push(selectItem);
        });
        return selectArr;
    }

    render() {
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor.select-doctor" /></div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" />: </label>
                        <Select
                            value={this.state.selectedValue}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={'Choose a doctor'}
                        />
                    </div>
                    <div className="content-right">
                        <label><FormattedMessage id="admin.manage-doctor.intro" />: </label>
                        <textarea className="form-control"
                            rows="4" onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-info-extra">
                    <div className="row">
                        <div className="col-4 form-group">
                            <label>Choose Price</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-4 form-group">
                            <label>Choose payment method</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-4 form-group">
                            <label>Choose Province</label>
                            <input className="form-control" />
                        </div>

                        <div className="col-4 form-group">
                            <label>Name's Clinic</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-4 form-group">
                            <label>Address Clinic</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-4 form-group">
                            <label>Note</label>
                            <input className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} value={this.state.contentMarkdown} />
                </div>
                <button className="btn btn-danger save-content-doctor" onClick={() => this.handleSaveContentMarkdown()}>
                    {this.state.hasOldData ? <FormattedMessage id="admin.manage-doctor.save" /> : <FormattedMessage id="admin.manage-doctor.add" />}
                </button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        doctorAllRedux: state.admin.doctorAll,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveADetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);


