import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

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
        if (prevProps.getScheduleTimeRedux !== this.props.getScheduleTimeRedux) {
            this.setState({
                rangeTime: this.props.getScheduleTimeRedux
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

    render() {
        let rangeTime = this.props.getScheduleTimeRedux;
        let language = this.props.language;
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
                                minDate={new Date()}
                            />
                        </div>

                        <div className="col-md-12 pick-hour-container">
                            <label><FormattedMessage id="manage-schedule.choose-time" /></label>
                            <div className="pick-hour-container">
                                {
                                    rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                        return (<button className="btn btn-outline-primary" key={index}>
                                            {LANGUAGES.VI == language ? item.valueVi : item.valueEn}
                                        </button>)
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <button className="btn btn-primary mt-4">Save Info</button>
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
