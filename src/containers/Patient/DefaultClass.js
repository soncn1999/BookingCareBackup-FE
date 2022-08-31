import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import Home from '../../../routes/Home';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { getExtraInfoDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        return (
            <div></div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultClass));


