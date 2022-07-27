import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MedicalFacility.scss';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <div className="section section--background-color">
                <div className="section-content">
                    <div className="section-heading">
                        <div className="section-title">Cơ sở y tế nổi bật</div>
                        <button className="section-heading__btn">
                            Xem thêm
                        </button>
                    </div>

                    <Slider {...settings}>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">
                                Bệnh viện Hữu nghị Việt Đức
                            </a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">
                                Bệnh viện Chợ Rẫy
                            </a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">
                                Phòng khám Bệnh viện Đại học Y Dược 1
                            </a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">
                                Bệnh viện K - Cơ sở Phan Chu Trinh
                            </a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">
                                Bệnh viện Ung bướu Hưng Việt
                            </a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">
                                Hệ thống Y tế Thu Cúc TCI
                            </a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">
                                Phòng khám Đa khoa Saigon Healthcare
                            </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
