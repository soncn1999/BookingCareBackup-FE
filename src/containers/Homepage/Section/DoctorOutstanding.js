import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './DoctorOutstanding.scss';
import * as actions from '../../../store/actions';
import Slider from "react-slick";
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class DoctorOutstanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
        }
    }

    componentDidMount() {
        this.props.loadTopDoctorRedux(10);
        console.log(this.props.languageRedux);
    }

    imageBuffer = (bufferUrl) => {
        let imageBase64 = '';
        if (bufferUrl) {
            imageBase64 = new Buffer(bufferUrl, 'base64').toString('binary');
        }
        return imageBase64;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
            let doctorsArr = [...this.props.doctorsRedux];

            doctorsArr.map((doctor, index) => {
                doctor[`imgPreviewUrl`] = this.imageBuffer(doctor.image);
            })

            this.setState({
                doctors: doctorsArr,
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        let { doctors } = this.state;

        let language = this.props.languageRedux;

        return (
            <div className="section">
                <div className="section-content">
                    <div className="section-heading">
                        <div className="section-title">
                            <FormattedMessage id="homepage.doctor-outstanding" />
                        </div>
                        <button className="section-heading__btn">
                            <FormattedMessage id="homepage.show-more" />
                        </button>
                    </div>

                    <Slider {...settings}>
                        {doctors && doctors.length > 0 && doctors.map((doctor, index) => {
                            return (
                                <div className="section-content__wrapper" key={index} onClick={() => this.handleViewDetailDoctor(doctor)}>
                                    <div className="section-content__img-customize avt-doctor--size"
                                        style={{
                                            backgroundImage: `url(${doctor.imgPreviewUrl})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}></div>
                                    <a href="" className="section-content__title">
                                        {language === LANGUAGES.VI ? `${doctor.positionData.valueVi}` : `${doctor.positionData.valueEn}`} {` ${doctor.firstName} ${doctor.lastName}`}
                                    </a>
                                    <span className="section-content__subtitle">Sức khỏe tâm thần</span>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctorsRedux: state.admin.doctors,
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctorRedux: (limit) => dispatch(actions.fetchTopDoctor(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorOutstanding));
