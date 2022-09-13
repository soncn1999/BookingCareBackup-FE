import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import Home from '../../../routes/Home';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import './DoctorExtraInfo.scss';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { getExtraInfoDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPrice: false,
            extraDoctorInfo: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await getExtraInfoDoctorById(id);
            if (response && response.errCode === 0) {
                this.setState({
                    extraDoctorInfo: response.data,
                });
            } else {
                console.log(response.message);
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {

    }

    handleShowPriceBox = (param) => {
        this.setState({
            isShowPrice: param,
        });
    }

    render() {
        let language = this.props.language;
        let { extraDoctorInfo } = this.state;

        return (
            <div className="doctor-extra-info-container">
                <div className="doctor-extra-info__title">
                    <FormattedMessage id="patient.extra-info-doctor.address-clinic" />
                </div>
                <div className='doctor-extra-info__clinic-name'>
                    <FormattedMessage id="patient.extra-info-doctor.name-clinic" />:
                    &nbsp;
                    {extraDoctorInfo && extraDoctorInfo.nameClinic && <span>{extraDoctorInfo.nameClinic}</span>}
                </div>
                <div className='doctor-extra-info__clinic-address'>
                    {extraDoctorInfo && extraDoctorInfo.addressClinic && <span>{extraDoctorInfo.addressClinic}</span>}
                </div>
                <div className="doctor-extra-info__price-box">
                    <div className="doctor-extra-info__title doctor-extra-info__title--separate">
                        <FormattedMessage id="patient.extra-info-doctor.price" /> : {
                            !this.state.isShowPrice && (extraDoctorInfo && extraDoctorInfo.priceTypeData &&
                                <span>
                                    {language === LANGUAGES.VI ? <NumberFormat value={extraDoctorInfo.priceTypeData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'VND'} /> :
                                        <NumberFormat value={extraDoctorInfo.priceTypeData.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />}
                                    &nbsp;
                                    <button type="button" className="doctor-extra-info__handle-show-btn" onClick={() => this.handleShowPriceBox(true)}>
                                        <FormattedMessage id="patient.extra-info-doctor.show-detail" />
                                    </button>
                                </span>)
                        }
                    </div>
                    {
                        this.state.isShowPrice && (
                            <div className="doctor-extra-info__price-box-detail">
                                <div className="doctor-extra-info__price-box-desc-up">
                                    <div className="doctor-extra-info__price-box-desc-left">
                                        <span><b><FormattedMessage id="patient.extra-info-doctor.price" /></b></span>
                                        <span>
                                            <FormattedMessage id="patient.extra-info-doctor.price-desc" />
                                        </span>
                                    </div>
                                    <div className="doctor-extra-info__price-box-desc-right">
                                        {extraDoctorInfo && extraDoctorInfo.priceTypeData &&
                                            (language === LANGUAGES.VI ? <NumberFormat value={extraDoctorInfo.priceTypeData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                                :
                                                <NumberFormat value={extraDoctorInfo.priceTypeData.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />)
                                        }
                                    </div>
                                </div>
                                <div className="doctor-extra-info__price-box-desc-down">
                                    <FormattedMessage id="patient.extra-info-doctor.payment-desc" />:
                                    &nbsp;
                                    {
                                        extraDoctorInfo && extraDoctorInfo.paymentTypeData && (language === LANGUAGES.VI ? extraDoctorInfo.paymentTypeData.valueVi : extraDoctorInfo.paymentTypeData.valueEn)
                                    }
                                </div>
                                <button type="button" className="doctor-extra-info__handle-show-btn doctor-extra-info__handle-show-btn--seperate"
                                    onClick={() => this.handleShowPriceBox(false)}>
                                    <FormattedMessage id="patient.extra-info-doctor.hide-detail" />
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo));


