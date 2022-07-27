import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './About.scss';

class About extends Component {

    render() {

        return (
            <div className="section-about">
                <div className="section-content">
                    <div className="section-title">Truyền thông nói về BookingCare</div>
                    <div className="section__about-content">
                        <div className="about-content__left">
                            <iframe width="750px"
                                height="370px"
                                src="https://www.youtube.com/embed/fA_5o55GqT0"
                                title="Em Ngày Xưa Khác Rồi | Official MV | Hiền Hồ"
                                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                        </div>
                        <div className="about-content__right">
                            Right
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
