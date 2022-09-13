import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';

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
            //save to Markdown Table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: {},
            description: '',
            listDoctor: [],
            hasOldData: false,

            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }

    componentDidMount() {
        this.props.getAllDoctorRedux();
        this.props.getRequiredDoctorInfoRedux();
        this.setState({
            language: this.props.language,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctorAllRedux !== this.props.doctorAllRedux) {
            this.setState({
                listDoctor: this.buildDataInputSelect(this.props.doctorAllRedux, 'USERS'),
            })
        }
        if (prevProps.requiredDoctorInfoRedux !== this.props.requiredDoctorInfoRedux || prevProps.language !== this.props.language) {
            let { resPayment, resPrice, resProvince } = this.props.requiredDoctorInfoRedux;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
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
            action: hasOldData == true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            priceId: this.state.selectedPrice.value,
            provinceId: this.state.selectedProvince.value,
            paymentId: this.state.selectedPayment.value,
            addressClinic: this.state.addressClinic,
            nameClinic: this.state.nameClinic,
            note: this.state.note,
        });
    }

    handleOnChangeData = (event) => {
        let stateCopy = { ...this.state };
        stateCopy[event.target.name] = event.target.value;
        this.setState({
            ...stateCopy,
        })
    }

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        console.log('check selected: ', name, selectedOption);
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    }

    handleChangeSelect = async (selectedDoctor, name) => {
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

        if (response && response.errCode === 0 && response.data.doctorData) {
            let { addressClinic, nameClinic, note, paymentId, priceId, provinceId } = response.data.doctorData;
            let paymentSelected = this.handleGetSelectOption(paymentId, 'PAYMENT');
            let priceSelected = this.handleGetSelectOption(priceId, 'PRICE');
            let provinceSelected = this.handleGetSelectOption(provinceId, 'PROVINCE');
            this.setState({
                selectedPrice: priceSelected,
                selectedPayment: paymentSelected,
                selectedProvince: provinceSelected,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
            });
        }
    };

    buildDataInputSelect = (inputData, type) => {
        let language = this.props.language;
        let selectArr = [];
        if (type === 'USERS') {
            inputData.forEach((item, index) => {
                let selectItem = {};
                selectItem.label = `${item.firstName} ${item.lastName}`;
                selectItem.value = item.id;
                selectArr.push(selectItem);
            });
        } else if (type === 'PRICE') {
            inputData.forEach((item, index) => {
                let selectItem = {};
                selectItem.label = language === LANGUAGES.VI ? `${item.valueVi} VND` : `${item.valueEn} USD`;
                selectItem.value = item.keyMap;
                selectArr.push(selectItem);
            });
        } else if (type === 'PAYMENT' || type === 'PROVINCE') {
            inputData.forEach((item, index) => {
                let selectItem = {};
                selectItem.label = language === LANGUAGES.VI ? `${item.valueVi}` : `${item.valueEn}`;
                selectItem.value = item.keyMap;
                selectArr.push(selectItem);
            });
        }
        return selectArr;
    }

    handleGetSelectOption = (option, type) => {
        let { listPayment, listPrice, listProvince } = this.state;
        let selectedObj = {}
        if (type === 'PAYMENT') {
            selectedObj = listPayment.find((item) => {
                return item.value === option;
            });
        } else if (type === 'PRICE') {
            selectedObj = listPrice.find((item) => {
                return item.value === option;
            });
        } else if (type === 'PROVINCE') {
            selectedObj = listProvince.find((item) => {
                return item.value === option;
            });
        }
        return selectedObj;
    }

    render() {
        console.log('check state: ', this.state);
        let { language } = this.props;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor.select-doctor" /></div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" />: </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={language === LANGUAGES.EN ? 'Choose doctor' : 'Chọn bác sỹ'}
                        />
                    </div>
                    <div className="content-right">
                        <label><FormattedMessage id="admin.manage-doctor.intro" />: </label>
                        <textarea className="form-control"
                            rows="4" onChange={(event) => this.handleOnChangeData(event)}
                            value={this.state.description}
                            name="description"
                        ></textarea>
                    </div>
                </div>
                <div className="more-info-extra">
                    <div className="row">
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.price" />: </label>
                            <Select
                                value={this.state.selectedPrice}
                                options={this.state.listPrice}
                                placeholder={language === LANGUAGES.EN ? 'Choose price' : 'Chọn giá khám'}
                                name="selectedPrice"
                                onChange={this.handleChangeSelectDoctorInfo}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.payment" />: </label>
                            <Select
                                value={this.state.selectedPayment}
                                options={this.state.listPayment}
                                placeholder={language === LANGUAGES.EN ? 'Choose payment' : 'Chọn phương thức thanh toán'}
                                name="selectedPayment"
                                onChange={this.handleChangeSelectDoctorInfo}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                            <Select
                                value={this.state.selectedProvince}
                                options={this.state.listProvince}
                                placeholder={language === LANGUAGES.EN ? 'Choose province' : 'Chọn tỉnh thành'}
                                name="selectedProvince"
                                onChange={this.handleChangeSelectDoctorInfo}
                            />
                        </div>

                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                            <input className="form-control" name="nameClinic"
                                onChange={(event) => { this.handleOnChangeData(event) }} value={this.state.nameClinic} />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                            <input className="form-control" name="addressClinic"
                                onChange={(event) => { this.handleOnChangeData(event) }} value={this.state.addressClinic} />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                            <input className="form-control" name="note"
                                onChange={(event) => { this.handleOnChangeData(event) }} value={this.state.note} />
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
        requiredDoctorInfoRedux: state.admin.allRequiredDoctorInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveADetailDoctor(data)),
        getRequiredDoctorInfoRedux: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);


