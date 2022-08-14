import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, dateFormat } from '../../../utils/constant';
import Select from 'react-select';
import { saveBulkScheduleDoctor } from '../../../services/userService';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {
                label: '',
                value: '',
            },
            currentDate: '',
            rangeTime: [],
        }
    }

    async componentDidMount() {
        this.props.getAllDoctorRedux();
        this.props.allScheduleTimeRedux();
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.doctorAllRedux !== this.props.doctorAllRedux) {
            this.setState({
                listDoctor: this.buildDataInputSelect(this.props.doctorAllRedux),
            })
        }

        let dataTime = this.props.getScheduleTimeRedux;
        if (dataTime && dataTime.length > 0) {
            dataTime = dataTime.map((item) => ({ ...item, isActive: false }));
        }

        if (prevProps.getScheduleTimeRedux !== this.props.getScheduleTimeRedux) {
            this.setState({
                rangeTime: dataTime
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let selectArr = [];
        if (inputData && inputData.length > 0) {
            inputData.forEach((item, index) => {
                let selectItem = {};
                selectItem.label = `${item.firstName} ${item.lastName}`;
                selectItem.value = item.id;
                selectArr.push(selectItem);
            });
        }
        return selectArr;
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({
            selectedDoctor
        });
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    }

    handleClickBtnTime = (time) => {
        let rangeTimeCopy = this.state.rangeTime;
        if (rangeTimeCopy && rangeTimeCopy.length > 0) {
            rangeTimeCopy.map((item) => {
                if (item.id === time.id) {
                    item.isActive = !item.isActive;
                }
                return item;
            });

            this.setState({
                rangeTime: rangeTimeCopy
            });
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error('🐦 You have to choose Examination Date!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('🐦 You have to choose Examination Doctor!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        console.log('current date: ' + currentDate);
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter((item) => item.isActive === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((time) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = time.keyMap;
                    result.push(object);
                    return result;
                })
            } else {
                toast.error('🐦 You have to choose Examination Time!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }
        }
        let response = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        });
        if (response && response.errCode === 0) {
            toast.success('🐶 Create new Schedule Successful!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(`🐦 Ops, ${response.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    render() {
        let { rangeTime } = this.state;
        let language = this.props.language;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-date" /> </label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>

                        <div className="col-md-12 pick-hour-container">
                            <label><FormattedMessage id="manage-schedule.choose-time" /></label>
                            <div className="pick-hour-container">
                                {
                                    rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                        return (<button className={item.isActive ? 'btn btn-warning' : "btn btn-outline-primary"} key={index} onClick={() => this.handleClickBtnTime(item)}>
                                            {LANGUAGES.VI == language ? item.valueVi : item.valueEn}
                                        </button>)
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <button className="btn btn-primary mt-4" onClick={() => this.handleSaveSchedule()}>Save Info</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctorAllRedux: state.admin.doctorAll,
        language: state.app.language,
        getScheduleTimeRedux: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        allScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
