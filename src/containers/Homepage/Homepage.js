import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import '../../assets/fontawesome-free-6.1.1-web/css/all.css';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import DoctorOutstanding from './Section/DoctorOutstanding';
import About from './Section/About';
import './Homepage.scss';

class Homepage extends Component {

    render() {

        return (
            <div>
                <HomeHeader />
                <Specialty />
                <MedicalFacility />
                <DoctorOutstanding />
                <About />
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
