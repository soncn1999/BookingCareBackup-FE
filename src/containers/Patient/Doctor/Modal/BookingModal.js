import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { withRouter } from 'react-router-dom';
import localization from 'moment/locale/vi';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import { getProfileDoctorById } from '../../../../services/userService';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleCloseBookingModal = () => {
        this.props.handleToggleBookingModal();
    }

    render() {
        let { isOpenModalBooking, dataScheduleTimeModal } = this.props;

        return (
            <Modal isOpen={isOpenModalBooking} className={'booking-modal-container'} size="lg" centered>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <div className="booking-modal-header__left">
                            <span>Thông tin đặt lịch khám bệnh</span>
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
                                    <label>Họ tên</label>
                                    <input type="text" className="form-control" placeholder="Họ tên bệnh nhân" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" placeholder="Email bệnh nhân" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoại</label>
                                    <input type="text" className="form-control" placeholder="Số điện thoại bệnh nhân" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ liên hệ</label>
                                    <input type="text" className="form-control" placeholder="Địa chỉ liên hệ bệnh nhân" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Giới tính</label>
                                    <input type="text" className="form-control" placeholder="Giới tính bệnh nhân" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Đặt lịch khám cho</label>
                                    <input type="text" className="form-control" placeholder="Bệnh nhân hoặc người thân" />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Lý do khám</label>
                                    <input type="text" className="form-control" placeholder="Lý do khám của bệnh nhân" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button type="button" className="btn booking-modal-footer__btn booking-modal-footer__btn--color-custom">Xác nhận</button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingModal));


