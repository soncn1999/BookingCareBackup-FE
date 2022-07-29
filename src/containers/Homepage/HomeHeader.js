import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { initMessageListener } from 'redux-state-sync';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenSidebar: false,
            isVi: true,
        };
    }

    toggleSidebar = () => {
        this.setState({
            isOpenSidebar: !this.state.isOpenSidebar,
        }, () => {
            console.log(this.state.isOpenSidebar);
        });
    }

    switchLanguages = (language) => {
        //fire redux event : action 
        this.props.changeLanguageAppRedux(language); //trigger firing an action
        if (language === 'vi') {
            this.setState({
                isVi: true,
            })
        } else {
            this.setState({
                isVi: false,
            })
        }
    }

    render() {
        let arrMedicalExamine = [
            {
                id: 1,
                title: <FormattedMessage id="banner.specialized-examination" />,
                url: '',
            },
            {
                id: 2,
                title: <FormattedMessage id="banner.remote-examination" />,
                url: '',
            },
            {
                id: 3,
                title: <FormattedMessage id="banner.general-examination" />,
                url: '',
            },
            {
                id: 4,
                title: <FormattedMessage id="banner.medical-test" />,
                url: '',
            },
            {
                id: 5,
                title: <FormattedMessage id="banner.mental-health" />,
                url: '',
            },
            {
                id: 6,
                title: <FormattedMessage id="banner.dental-examination" />,
                url: '',
            },
            {
                id: 7,
                title: <FormattedMessage id="banner.surgery-pack" />,
                url: '',
            },
            {
                id: 8,
                title: <FormattedMessage id="banner.medical-products" />,
                url: '',
            },
        ];

        return (
            <div className="booking-container">
                <div className="header">
                    <div className="sidebar-logo">
                        <div className="sidebar">
                            <i className="fa-solid fa-bars sidebar__icon" onClick={() => this.toggleSidebar()}></i>
                            <div className="sidebar__container" style={this.state.isOpenSidebar ? { "display": "block" } : { "display": "none" }}>
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
                                <a href="#">
                                    <FormattedMessage id="homeheader.specialty" />
                                </a>
                            </div>
                            <div className="navbar-item__subtitle">
                                <FormattedMessage id="homeheader.find-doctor" />
                            </div>
                        </div>

                        <div className="navbar-item">
                            <div className="navbar-item__title">
                                <a href="#">
                                    <FormattedMessage id="homeheader.medical-facility" />
                                </a>
                            </div>
                            <div className="navbar-item__subtitle">
                                <FormattedMessage id="homeheader.choose-hospital-clinic" />
                            </div>
                        </div>

                        <div className="navbar-item">
                            <div className="navbar-item__title">
                                <a href="#">
                                    <FormattedMessage id="homeheader.doctor" />
                                </a>
                            </div>
                            <div className="navbar-item__subtitle">
                                <FormattedMessage id="homeheader.choose-doctor" />
                            </div>
                        </div>

                        <div className="navbar-item">
                            <div className="navbar-item__title">
                                <a href="#">
                                    <FormattedMessage id="homeheader.medical-examination-combo" />
                                </a>
                            </div>
                            <div className="navbar-item__subtitle">
                                <FormattedMessage id="homeheader.general-health-examination" />
                            </div>
                        </div>
                    </div>
                    <div className="contact">
                        <i className="fa-solid fa-question contact__icon"></i>
                        <span className="contact__title">
                            <a href="">
                                <FormattedMessage id="homeheader.contact-support" />
                            </a>
                        </span>
                    </div>

                    <div className="language">
                        <div className="language-title">
                            <span><FormattedMessage id="homeheader.language" />:</span> &nbsp;
                            <b>{this.state.isVi ? 'VI' : 'EN'}</b>
                        </div>
                        <ul className='language-list'>
                            <li className="language-item" >
                                <span onClick={() => this.switchLanguages(LANGUAGES.VI)}>Vietnam</span>
                                <div className="language-vi"></div>
                            </li>
                            <li className="language-item" >
                                <span onClick={() => this.switchLanguages(LANGUAGES.EN)}>England</span>
                                <div className="language-en"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="sidebar__overlay"
                    onClick={() => this.toggleSidebar()}
                    style={this.state.isOpenSidebar ? { "display": "block" } : { "display": "none" }}></div>
                <div className="banner">
                    <div className="banner-title">
                        <p>
                            <FormattedMessage id="banner.title1" />
                        </p>
                        <b>
                            <FormattedMessage id="banner.title2" />
                        </b>
                    </div>
                    <div className="banner-search">
                        <div className="banner-search__input">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary banner-search__input-btn" type="button">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </div>

                                <input type="text"
                                    className="form-control banner-search__input-form"
                                    placeholder= {this.state.isVi ? "Tìm bệnh viện" : "Search Hospitals"}
                                    aria-label=""
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)), //fire an action
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
