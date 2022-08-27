import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getDetailInfoDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import DoctorSchedule from './DoctorSchedule';
import './DoctorDetail.scss';
import DoctorExtraInfo from './DoctorExtraInfo';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            try {
                let res = await getDetailInfoDoctor(this.props.match.params.id);
                if (res.errCode === 0) {
                    this.setState({
                        detailDoctor: res.data
                    })
                } else {
                    console.log(res);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        let { detailDoctor } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="intro-doctor__left">
                            <div className="intro-doctor__avt"
                                style={{
                                    backgroundImage: `url(${detailDoctor.image})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    border: '1px solid #ccc'
                                }}></div>
                        </div>
                        <div className="intro-doctor__right">
                            <div className="intro-doctor__title">
                                {LANGUAGES.VI === this.props.languageRedux && detailDoctor && detailDoctor.positionData &&
                                    <span>{detailDoctor.positionData.valueVi}</span>
                                }
                                {LANGUAGES.EN === this.props.languageRedux && detailDoctor && detailDoctor.positionData &&
                                    <span>{detailDoctor.positionData.valueEn}</span>
                                }
                                &nbsp;{`${detailDoctor.firstName} ${detailDoctor.lastName}`}
                            </div>
                            <div className="intro-doctor__desc">
                                {detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <span>{detailDoctor.Markdown.description}</span>
                                }
                            </div>
                            <div className="intro-doctor__interactive">
                                <div className="intro-doctor__interactive-item">
                                    <i className="fa-solid fa-thumbs-up"></i> Like
                                </div>
                                <div className="intro-doctor__interactive-item">
                                    <i className="fa-solid fa-share"></i> Share
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfo />
                        </div>
                    </div>
                    <div className="detail-info-doctor">
                        {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className="comment-doctor"></div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);


