import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import Home from '../../../routes/Home';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import localization from 'moment/locale/vi';
import './ProfileDoctor.scss';
import moment from 'moment';
import { getExtraInfoDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { getProfileDoctorById } from '../../../services/userService';
import _ from 'lodash';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorInfo: {}
        }
    }

    componentDidMount() {
        this.handleGetProfileDoctorById();
    }

    handleGetProfileDoctorById = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let response = await getProfileDoctorById(this.props.match.params.id);
            if (response && response.errCode === 0) {
                this.setState({
                    doctorInfo: response.data,
                });
            } else {
                console.log(response.message);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleConvertTime = (unixTime) => {
        let language = this.props.language;
        if (!_.isEmpty(unixTime)) {
            let time = LANGUAGES.VI === language ? moment(+unixTime).format('dddd - DD/MM/YYYY') : moment(+unixTime).locale('en').format('ddd - MM/DD/YYYY');
            return time;
        } else {
            return '';
        }
    }

    render() {
        let { dataScheduleTimeModal, isShowShortDesc } = this.props;
        let language = this.props.language;
        let { doctorInfo } = this.state;
        return (
            <Fragment>
                <div className="doctor-info">
                    <div className="doctor-info__left">
                        {
                            doctorInfo && doctorInfo.image && (
                                <div className="doctor-preview-img"
                                    style={{
                                        backgroundImage: `url(${doctorInfo.image})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        border: '1px solid #ccc'
                                    }}
                                ></div>
                            )
                        }
                    </div>
                    <div className="doctor-info__right">
                        {
                            isShowShortDesc ? (
                                <div className="doctor-info__description">
                                    <div className="doctor-info__specialty">
                                        {
                                            doctorInfo
                                            && doctorInfo.positionData
                                            && doctorInfo.firstName
                                            && doctorInfo.lastName &&
                                            (LANGUAGES.VI === language ?
                                                <span>{doctorInfo.positionData.valueVi} {doctorInfo.firstName} {doctorInfo.lastName}</span> :
                                                <span>{doctorInfo.positionData.valueEn} {doctorInfo.firstName} {doctorInfo.lastName}</span>
                                            )
                                        }
                                    </div>
                                    <div className="doctor-info__short-desc">
                                        Mô tả: <br />
                                        {
                                            doctorInfo
                                            && doctorInfo.Markdown
                                            && doctorInfo.Markdown.description &&
                                            <span>{doctorInfo.Markdown.description}</span>
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className="doctor-info__booking">
                                    <div className="doctor-info__title">
                                        Đặt lịch khám
                                    </div>
                                    <div className="doctor-info__specialty">
                                        {
                                            doctorInfo
                                            && doctorInfo.positionData
                                            && doctorInfo.firstName
                                            && doctorInfo.lastName &&
                                            (LANGUAGES.VI === language ?
                                                <span>{doctorInfo.positionData.valueVi} {doctorInfo.firstName} {doctorInfo.lastName}</span> :
                                                <span>{doctorInfo.positionData.valueEn} {doctorInfo.firstName} {doctorInfo.lastName}</span>
                                            )
                                        }
                                    </div>
                                    <div className="doctor-info__examination-schedule">
                                        {dataScheduleTimeModal
                                            && dataScheduleTimeModal.timeTypeData
                                            && dataScheduleTimeModal.date
                                            && (LANGUAGES.VI === language ?
                                                <span>{dataScheduleTimeModal.timeTypeData.valueVi} - {this.handleConvertTime(dataScheduleTimeModal.date)}</span> :
                                                <span>{dataScheduleTimeModal.timeTypeData.valueEn} - {this.handleConvertTime(dataScheduleTimeModal.date)}</span>
                                            )}
                                    </div>
                                    <div className="doctor-info__desc">
                                        <span>Miễn phí đặt lịch</span>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
                <div className="doctor-price">
                    <div className="doctor-price__left">
                        <i className="fa-solid fa-square-check"></i>
                    </div>
                    <div className="doctor-price__right">
                        Giá khám: &nbsp;
                        {doctorInfo && doctorInfo.doctorData && doctorInfo.doctorData.priceTypeData && doctorInfo.doctorData.priceTypeData.valueEn && doctorInfo.doctorData.priceTypeData.valueVi &&
                            (
                                LANGUAGES.VI === language ?
                                    <NumberFormat value={doctorInfo.doctorData.priceTypeData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'VND'} /> :
                                    <NumberFormat value={doctorInfo.doctorData.priceTypeData.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                            )
                        }
                    </div>
                </div>
            </Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor));


