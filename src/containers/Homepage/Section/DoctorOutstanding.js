import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './DoctorOutstanding.scss';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class DoctorOutstanding extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <div className="section">
                <div className="section-content">
                    <div className="section-heading">
                        <div className="section-title">Bác sĩ nổi bật tuần qua</div>
                        <button className="section-heading__btn">
                            Tìm kiếm
                        </button>
                    </div>

                    <Slider {...settings}>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize avt-doctor--size"></div>
                            <a href="" className="section-content__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp NTT</a>
                            <span className="section-content__subtitle">Sức khỏe tâm thần</span>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize avt-doctor--size"></div>
                            <a href="" className="section-content__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp NTT</a>
                            <span className="section-content__subtitle">Sức khỏe tâm thần</span>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize avt-doctor--size"></div>
                            <a href="" className="section-content__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp NTT</a>
                            <span className="section-content__subtitle">Sức khỏe tâm thần</span>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize avt-doctor--size"></div>
                            <a href="" className="section-content__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp NTT</a>
                            <span className="section-content__subtitle">Sức khỏe tâm thần</span>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize avt-doctor--size"></div>
                            <a href="" className="section-content__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp NTT</a>
                            <span className="section-content__subtitle">Sức khỏe tâm thần</span>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize avt-doctor--size"></div>
                            <a href="" className="section-content__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp NTT</a>
                            <span className="section-content__subtitle">Sức khỏe tâm thần</span>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize avt-doctor--size"></div>
                            <a href="" className="section-content__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp NTT</a>
                            <span className="section-content__subtitle">Sức khỏe tâm thần</span>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize avt-doctor--size"></div>
                            <a href="" className="section-content__title">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp NTT</a>
                            <span className="section-content__subtitle">Sức khỏe tâm thần</span>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorOutstanding);
