import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import Home from '../../../routes/Home';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            availableTimes: [],
        }
    }

    async componentDidMount() {
        //get the current date
        console.log('moment vie: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'));
        //get 7 date
        let arrDays = this.getArrDays();

        this.setState({
            allDays: arrDays,
        });

        if (this.props.match && this.props.match.params && this.props.match.params.id && arrDays && arrDays.length > 0) {
            let response = await getScheduleDoctorByDate(this.props.match.params.id, arrDays[0].value);
            console.log(response);
            if (response && response.errCode === 0) {
                this.setState({
                    availableTimes: response.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.languageRedux !== this.props.languageRedux) {
            let arrDays = this.getArrDays();

            this.setState({
                allDays: arrDays,
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = () => {
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (this.props.languageRedux === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).add(i, 'days').format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('days').valueOf();
            // startOf('days): Lay theo ngay, gio mac dinh la 0:00:00, mac dinh new Date tinh ca gio phut giay
            arrDays.push(object);
        }
        return arrDays;
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await getScheduleDoctorByDate(id, event.target.value);
            if (response && response.errCode === 0) {
                this.setState({
                    availableTimes: response.data,
                });
            } else {
                this.setState({
                    availableTimes: [],
                })
            }
        }
    }

    render() {
        let { allDays, availableTimes } = this.state;

        let language = this.props.languageRedux;

        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(event) => this.handleOnchangeSelect(event)} className="all-schedule__select">
                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (<option value={item.value} key={index}>{item.label}</option>)
                        })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <span className="text-calendar__title">
                            <i className="fa-solid fa-calendar-days"></i>
                            &nbsp; <FormattedMessage id="patient.detail-doctor.schedule" />
                        </span>
                    </div>
                    <div className="time-content">
                        {availableTimes && availableTimes.length > 0 && availableTimes.map((item, index) => {
                            return (<button className="time-content__icon" value={item.timeType} key={index}>
                                {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                            </button>);
                        })}

                        {
                            availableTimes && availableTimes.length == 0 && <span>
                                <FormattedMessage id="patient.detail-doctor.no-schedule" />
                            </span>
                        }
                    </div>
                    {
                        availableTimes && availableTimes.length > 0 && <span><FormattedMessage id="patient.detail-doctor.select" /> <i className="fa-solid fa-hand-pointer"></i> <FormattedMessage id="patient.detail-doctor.book" /></span>
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));


