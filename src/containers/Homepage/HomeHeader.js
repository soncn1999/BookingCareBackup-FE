import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { initMessageListener } from 'redux-state-sync';

class HomeHeader extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isOpenSidebar: false,
        };
    }

    toggleSidebar = () => {
        this.setState({
            isOpenSidebar: !this.state.isOpenSidebar,
        }, () => {
            console.log(this.state.isOpenSidebar);
        });
    }

    render() {
        let arrMedicalExamine = [
            {
                id: 1,
                title: 'Khám chuyên khoa',
                url: '',
            },
            {
                id: 2,
                title: 'Khám từ xa',
                url: '',
            },
            {
                id: 3,
                title: 'Khám tổng quát',
                url: '',
            },
            {
                id: 4,
                title: 'Xét nghiệm y học',
                url: '',
            },
            {
                id: 5,
                title: 'Sức khỏe tinh thần',
                url: '',
            },
            {
                id: 6,
                title: 'Khám nha khoa',
                url: '',
            },
            {
                id: 7,
                title: 'Gói phẫu thuật',
                url: '',
            },
            {
                id: 8,
                title: 'Sản phẩm y tế',
                url: '',
            },
        ];

        return (
            <div className="container">
                <div className="header">
                    <div className="sidebar-logo">
                        <div className="sidebar">
                            <i className="fa-solid fa-bars sidebar__icon" onClick={() => this.toggleSidebar()}></i>
                            <div className="sidebar__container" style={this.state.isOpenSidebar ? {"display": "block"} : {"display": "none"}}>
                                <ul className="sidebar__list">
                                    <li className="sidebar__item sidebar__item--border-top"><a href="">Trang chủ</a></li>
                                    <li className="sidebar__item"><a href="">Cẩm nang</a></li>
                                    <li className="sidebar__item"><a href="">Liên hệ hợp tác</a></li>
                                    <li className="sidebar__item"><a href="">Tuyển dụng</a></li>
                                    <li className="sidebar__item">
                                        <h4 className="sidebar__item-about">Về BookingCare</h4>
                                    </li>
                                    <li className="sidebar__item"><a href="">Dành cho bệnh nhân</a></li>
                                    <li className="sidebar__item"><a href="">Dành cho bác sĩ</a></li>
                                    <li className="sidebar__item"><a href="">Vai trò của BookingCare</a></li>
                                    <li className="sidebar__item"><a href="">Liên hệ</a></li>
                                    <li className="sidebar__item"><a href="">Câu hỏi thường gặp</a></li>
                                    <li className="sidebar__item"><a href="">Điều khoản sử dụng</a></li>
                                    <li className="sidebar__item"><a href="">Quy trình hỗ trợ giải quyết khiếu nại</a></li>
                                    <li className="sidebar__item"><a href="">Quy chế hoạt động</a></li>
                                </ul>
                                <div className="sidebar__social-network">
                                    <i className="fa-brands fa-facebook-square sidebar__social-network-fb"></i>
                                    <i className="fa-brands fa-youtube sidebar__social-network-yt"></i>
                                </div>
                            </div>
                        </div>
                        <div className="logo"></div>
                    </div>
                    <div className="navbar">
                        <div className="navbar-item">
                            <div className="navbar-item__title">
                                <a href="#">Chuyên khoa</a>
                            </div>
                            <div className="navbar-item__subtitle">
                                Tìm bác sĩ theo chuyên khoa
                            </div>
                        </div>

                        <div className="navbar-item">
                            <div className="navbar-item__title">
                                <a href="#"> Cơ sở y tế</a>
                            </div>
                            <div className="navbar-item__subtitle">
                                Chọn bệnh viện phòng khám
                            </div>
                        </div>

                        <div className="navbar-item">
                            <div className="navbar-item__title">
                                <a href="#">Bác sĩ</a>
                            </div>
                            <div className="navbar-item__subtitle">Chọn bác sĩ giỏi</div>
                        </div>

                        <div className="navbar-item">
                            <div className="navbar-item__title">
                                <a href="#"> Gói khám</a>
                            </div>
                            <div className="navbar-item__subtitle">Khám sức khỏe tổng quát</div>
                        </div>
                    </div>
                    <div className="contact">
                        <i className="fa-solid fa-question contact__icon"></i>
                        <span className="contact__title">
                            <a href="">Hỗ trợ</a>
                        </span>
                    </div>
                </div>
                <div className="sidebar__overlay" 
                onClick={() => this.toggleSidebar()}
                style={this.state.isOpenSidebar ? {"display": "block"} : {"display": "none"}}></div>
                <div className="banner">
                    <div className="banner-title">
                        <p>Nền tảng y tế </p>
                        <b>chăm sóc sức khỏe toàn diện</b>
                    </div>
                    <div className="banner-search">
                        <div className="banner-search__input">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary banner-search__input-btn" type="button">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </div>
                                <input type="text" className="form-control banner-search__input-form" placeholder="Tìm lý do khám" aria-label=""
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="banner-download">
                        <div className="banner-download__icon banner-download__icon-chplay">
                            <a href=""></a>
                        </div>
                        <div className="banner-download__icon banner-download__icon-appstore">
                            <a href=""></a>
                        </div>
                    </div>
                    <div className="banner-category">
                        <ul className="banner-list">
                            {arrMedicalExamine.map((item, index) => {
                                return (
                                    <li className="banner-item" key={item.id}>
                                        <div className={`banner-item__img banner-item__img-${item.id}`}></div>
                                        <div className="banner-item__title">
                                            <a href={item.url}>{item.title}</a>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="content">

                </div>
                <div className="footer">

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
