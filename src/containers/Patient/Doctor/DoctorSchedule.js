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

    componentDidMount() {
        //get the current date
        console.log('moment vie: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'));
        //get 7 date 
        console.log('language: ', this.props.languageReduxge);
        let arrDays = this.setArrDays();

        this.setState({
            allDays: arrDays,
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.languageRedux !== this.props.languageRedux) {
            let arrDays = this.setArrDays();

            this.setState({
                allDays: arrDays,
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = () => {
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (this.props.languageRedux === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM');
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
            console.log(response);
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
                            &nbsp;Lịch khám
                        </span>
                    </div>
                    <div className="time-content">
                        {availableTimes && availableTimes.length > 0 && availableTimes.map((item, index) => {
                            return (<button className="time-content__icon" value={item.timeType} key={index}>
                                {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                            </button>);
                        })}
                        {
                            availableTimes && availableTimes.length == 0 && <span>Không có lịch hẹn</span>
                        }
                    </div>
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


