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
                                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                        </div>
                        <div className="about-content__right">
                            <p>Em Ngày Xưa Khác Rồi | Official MV | Hiền Hồ
                                🎵 MV Em Ngày Xưa Khác Rồi là sản phẩm trở lại của Hiền Hồ sau khi rời The Voice 2017.
                                🎵 Em Ngày Xưa Khác Rồi là một sáng tác của Vương Anh Tú có giai điệu sâu lắng, đầy chất lãng mạn và mang đến cho Hiền Hồ nhiều sắc thái cảm xúc khi thể hiện.
                                🎵 Tạo hình trong MV lần này của Hiền Hồ sẽ là một cô gái khá lạnh lùng nhưng bên trong là những cảm xúc nội tâm mạnh mẽ của một cô gái khi yêu. Đặc biệt ,
                                nam diễn viên chính làm Hiền Hồ "lao đao" trong MV là anh chàng người Mỹ gốc Việt - Brian Trần Đắc Lộc anh chàng được khá nhiều bạn trẻ yêu thích vì gu thời
                                trang cũng như ngoại hình lạnh lùng, điển trai. </p>
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
