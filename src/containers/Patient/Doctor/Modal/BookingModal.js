import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { withRouter } from 'react-router-dom';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../../utils';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from "react-toastify";
import _ from 'lodash';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            phonenumber: '',
            email: '',
            address: '',
            reason: '',
            dob: '',
            currentDate: '',
            gender: '',
            doctorId: '',
            genderList: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.fetchGenderStartRedux();
            let genderListArr = this.props.genderRedux;
            let genderListSelect = [];
            let language = this.props.language;
            genderListArr.map((item) => {
                let genderListSelectObj = {};
                genderListSelectObj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                genderListSelectObj.value = item.keyMap;
                genderListSelect.push(genderListSelectObj);
                return genderListSelect;
            })

            this.setState({
                genderList: genderListSelect,
                doctorId: this.props.match.params.id,
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genderRedux !== this.props.genderRedux || prevProps.language !== this.props.language) {
            let genderListArr = this.props.genderRedux;
            let genderListSelect = [];
            let language = this.props.language;
            genderListArr.map((item) => {
                let genderListSelectObj = {};
                genderListSelectObj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                genderListSelectObj.value = item.keyMap;
                genderListSelect.push(genderListSelectObj);
                return genderListSelect;
            });

            this.setState({
                genderList: genderListSelect,
                doctorId: this.props.match.params.id,
            })
        }
    }

    handleCloseBookingModal = () => {
        this.props.handleToggleBookingModal();
    }

    handleOnchangeInput = (event) => {
        let stateCopy = { ...this.state };
        stateCopy[event.target.name] = event.target.value;
        this.setState(
            { ...stateCopy }
        );
    }

    buildTimeBooking = (dataTime) => {
        let language = this.props.language;
        console.log('check time: ', dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi :
                dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ? moment(+dataTime.date).format('dddd - DD/MM/YYYY') :
                moment(+dataTime.date).locale('en').format('dddd - DD/MM/YYYY');

            return `${time} - ${date}`;
        }
    }

    handleSubmitForm = async () => {
        let language = this.props.language;

        let timeBookingData = this.buildTimeBooking(this.props.dataScheduleTimeModal);

        let response = await postPatientBookAppointment({
            fullname: this.state.fullname,
            phonenumber: this.state.phonenumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            gender: this.state.gender.value,
            date: this.state.dob,
            doctorId: this.state.doctorId,
            timeType: this.props.dataScheduleTimeModal.timeType,
            timeTypeData: timeBookingData,
            doctorFullname: `${this.props.dataScheduleTimeModal.doctorScheduleData.firstName} ${this.props.dataScheduleTimeModal.doctorScheduleData.lastName}`,
            language: language,
            bookingTime: new Date().getTime(),
        });

        if (response.errCode === 0) {
            toast.success("🐹 Create Appointment succeeded!");
            this.props.handleToggleBookingModal();
        } else {
            toast.error("😢 Create Appointment failed!");
        }
    }

    handleOnchangeDatePicker = (currentDate) => {
        let dobUnix = new Date(currentDate[0]).getTime();
        let copyState = { ...this.state };
        copyState['dob'] = dobUnix;
        copyState['currentDate'] = currentDate[0];
        this.setState({
            ...copyState,
        });
    }

    onChangeGender = (option) => {
        let stateCopy = { ...this.state };
        stateCopy['gender'] = option;
        this.setState({
            ...stateCopy
        });
    }

    render() {
        let { isOpenModalBooking, dataScheduleTimeModal } = this.props;

        console.log(dataScheduleTimeModal);

        return (
            <Modal isOpen={isOpenModalBooking} className={'booking-modal-container'} size="lg" centered>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <div className="booking-modal-header__left">
                            <span>
                                <FormattedMessage id="patient.booking-modal.booking-modal-title" />
                            </span>
                        </div>
                        <div className="booking-modal-header__right">
                            <i className="fa-solid fa-xmark booking-modal-header__right--icon" onClick={() => this.handleCloseBookingModal()}></i>
                        </div>
                    </div>
                    <div className="booking-modal-body">
                        <ProfileDoctor dataScheduleTimeModal={dataScheduleTimeModal} isShowShortDesc={false} />

                        <div className="patient-form">
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.booking-modal-form-fullname" />
                                    </label>
                                    <input type="text" className="form-control" placeholder="Họ tên bệnh nhân"
                                        name="fullname"
                                        value={this.state.fullname}
                                        onChange={(event) => this.handleOnchangeInput(event)}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.booking-modal-form-email" />
                                    </label>
                                    <input type="text" className="form-control" placeholder="Email bệnh nhân"
                                        name="email"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangeInput(event)}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.booking-modal-form-phonenumber" />
                                    </label>
                                    <input type="text" className="form-control" placeholder="Số điện thoại bệnh nhân"
                                        name="phonenumber"
                                        value={this.state.phonenumber}
                                        onChange={(event) => this.handleOnchangeInput(event)}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.booking-modal-form-address" />
                                    </label>
                                    <input type="text" className="form-control" placeholder="Địa chỉ liên hệ bệnh nhân"
                                        name="address"
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchangeInput(event)}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.booking-modal-form-gender" />
                                    </label>
                                    <Select options={this.state.genderList} onChange={this.onChangeGender} value={this.state.gender} />
                                </div>
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.booking-modal-form-dob" />
                                    </label>
                                    <br />
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePicker}
                                        value={this.state.currentDate}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.booking-modal-form-reason" />
                                    </label>
                                    <input type="text" className="form-control" placeholder="Lý do khám của bệnh nhân"
                                        name="reason"
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnchangeInput(event)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button type="button"
                            className="btn booking-modal-footer__btn booking-modal-footer__btn--color-custom"
                            onClick={() => this.handleSubmitForm()}
                        >Xác nhận</button>
                        <button type="button" className="btn btn-danger booking-modal-footer__btn">Hủy</button>
                    </div>
                </div>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStartRedux: () => dispatch(actions.fetchGenderStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingModal));


