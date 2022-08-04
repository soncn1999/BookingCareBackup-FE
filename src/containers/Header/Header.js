import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from '../../store/actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVi: true,
        };
    }

    handleChangeLanguage = (language) => {
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
        const { processLogout } = this.props;
        const { userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className="languages">
                    <span className="">
                        <FormattedMessage id="homeheader.welcome" /> {userInfo && userInfo.firstName ? userInfo.lastName : ''}
                    </span>&nbsp;
                    <span className={this.state.isVi ? 'languages-vi languages-active' : 'languages'} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>{LANGUAGES.VI}</span>
                    &nbsp;
                    <span className={this.state.isVi ? 'languages-en' : 'languages-en languages-active'} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>{LANGUAGES.EN}</span>

                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)), //fire an action
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
