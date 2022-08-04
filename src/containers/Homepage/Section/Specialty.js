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
            <div className="section">
                <div className="section-content">
                    <div className="section-heading">
                        <div className="section-title">Chuyên khoa phổ biến</div>
                        <button className="section-heading__btn">
                            Xem thêm
                        </button>
                    </div>

                    <Slider {...settings}>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">Tai Mũi Họng</a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">Cột sống</a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">Y học Cổ truyền</a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">Châm cứu</a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">Sản Phụ khoa</a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">Siêu âm thai</a>
                        </div>
                        <div className="section-content__wrapper">
                            <div className="section-content__img-customize img-customize--size"></div>
                            <a href="" className="section-content__title">Nhi khoa</a>
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
