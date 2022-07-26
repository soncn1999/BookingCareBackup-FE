import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <div className="section-specialty">
                <div className="specialty-content">
                    <div className="specialty-title">Chuyên khoa phổ biến</div>
                    <Slider {...settings}>
                        <div className="specialty-content__wrapper">
                            <div className="specialty-content__img-customize"></div>
                            <a href="" className="specialty-content__title">Tai Mũi Họng</a>
                        </div>
                        <div className="specialty-content__wrapper">
                            <div className="specialty-content__img-customize"></div>
                            <a href="" className="specialty-content__title">Cột sống</a>
                        </div>
                        <div className="specialty-content__wrapper">
                            <div className="specialty-content__img-customize"></div>
                            <a href="" className="specialty-content__title">Y học Cổ truyền</a>
                        </div>
                        <div className="specialty-content__wrapper">
                            <div className="specialty-content__img-customize"></div>
                            <a href="" className="specialty-content__title">Châm cứu</a>
                        </div>
                        <div className="specialty-content__wrapper">
                            <div className="specialty-content__img-customize"></div>
                            <a href="" className="specialty-content__title">Sản Phụ khoa</a>
                        </div>
                        <div className="specialty-content__wrapper">
                            <div className="specialty-content__img-customize"></div>
                            <a href="" className="specialty-content__title">Siêu âm thai</a>
                        </div>
                        <div className="specialty-content__wrapper">
                            <div className="specialty-content__img-customize"></div>
                            <a href="" className="specialty-content__title">Nhi khoa</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
