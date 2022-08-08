import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            positions: [],
            roles: [],
            previewImgUrl: "",
            isOpen: false,

            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            roleId: '',
            avatar: '',

            action: '',
        };
    }

    componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let response = await getAllCode('gender');
        //     if (response.errCode === 0) {
        //         this.setState({
        //             gender: response.data,
        //         });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Compare current data with previous data. If they are different, the state will update
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genders: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roles: this.props.roleRedux,
                roleId: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.position;
            this.setState({
                positions: this.props.positionRedux,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            });
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRole = this.props.roleRedux;
            let arrPosition = this.props.positionRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: '',
            })
        }
    }

    handleOnChangeImage = async (event) => {
        //convert image to base64
        let data = event.target.files;
        let file = data[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true,
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ... this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }

    handleSaveUser = () => {
        console.log("Check State: ", this.state);
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        } else {
            let { action } = this.state;
            if (action === CRUD_ACTIONS.CREATE) {
                this.props.saveNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    gender: this.state.gender,
                    roleId: this.state.roleId,
                    phonenumber: this.state.phonenumber,
                    position: this.state.position,
                    avatar: this.state.avatar,
                });
            }

            if (action === CRUD_ACTIONS.EDIT) {
                this.props.editUserRedux({
                    id: this.state.id,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    gender: this.state.gender,
                    roleId: this.state.roleId,
                    phonenumber: this.state.phonenumber,
                    position: this.state.position,
                    avatar: this.state.avatar,
                })
            }

        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address', 'roleId', 'position'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            id: user.id,
            email: user.email,
            password: 'can not change password',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            roleId: user.roleId,
            avatar: '',
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
        })
    }

    render() {
        // let genders = this.state.gender;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;
        let { genders, positions, roles } = this.state;
        let { email, password, firstName, lastName, phonenumber, address, gender, position, roleId, avatar } = this.state;

        return (
            <div className="container">
                <div className="title">
                    <FormattedMessage id="manage-user.add" />
                </div>
                <div> {isGetGender === true ? 'Loading Gender' : ''}</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="form-container col-12">
                                <div className="form-container__header">
                                    <div className="form-group col-4 mt-2">
                                        <label htmlFor="exampleFormControlSelect1" className="preview-img__title">
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
                                        <div className="preview-img-container">
                                            <div className="preview-image"
                                                style={{
                                                    backgroundImage: `url(${this.state.previewImgUrl})`,
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center",
                                                    height: '210px',
                                                    width: '210px',
                                                }} onClick={() => this.openPreviewImage()}>
                                            </div>
                                            <input type="file" id="previewImg"
                                                hidden
                                                onChange={(event) => this.handleOnChangeImage(event)} name="file"
                                                accept="image/*"></input>
                                            <label
                                                htmlFor="previewImg"
                                                className="label-preview" >
                                                <FormattedMessage id="manage-user.upload-avatar" />
                                                &nbsp;<i className="fas fa-upload"></i>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group col-8 mt-2">
                                        <div className='row'>
                                            <div className="col-6 mt-2">
                                                <label htmlFor="exampleInputEmail1">
                                                    <FormattedMessage id="manage-user.email" />
                                                </label>
                                                <input type="email" className="form-control"
                                                    placeholder="Enter email" name="email"
                                                    value={email}
                                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                                    onChange={(event) => this.onChangeInput(event, 'email')} />
                                            </div>
                                            <div className="col-6 mt-2">
                                                <label htmlFor="exampleInputPassword1">
                                                    <FormattedMessage id="manage-user.password" />
                                                </label>
                                                <input type="password" className="form-control"
                                                    placeholder="Enter Password" name="password"
                                                    value={password}
                                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mt-2">
                                                <label htmlFor="exampleInputEmail1">
                                                    <FormattedMessage id="manage-user.firstName" />
                                                </label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter firstName" name="firstName"
                                                    value={firstName}
                                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                                />
                                            </div>
                                            <div className="col-6 mt-2">
                                                <label htmlFor="exampleInputEmail1">
                                                    <FormattedMessage id="manage-user.lastName" />
                                                </label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter lastName" name="lastName"
                                                    value={lastName}
                                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mt-2">
                                                <label htmlFor="exampleInputEmail1">
                                                    <FormattedMessage id="manage-user.phonenumber" />
                                                </label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter phonenumber" name="phonenumber"
                                                    value={phonenumber}
                                                    onChange={(event) => this.onChangeInput(event, 'phonenumber')}
                                                />
                                            </div>
                                            <div className="col-6 mt-2">
                                                <label htmlFor="exampleInputEmail1">
                                                    <FormattedMessage id="manage-user.address" />
                                                </label>
                                                <input type="text" className="form-control"
                                                    placeholder="Enter address" name="address"
                                                    value={address}
                                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-4 mt-2">
                                                <label htmlFor="exampleFormControlSelect1">
                                                    <FormattedMessage id="manage-user.gender" />
                                                </label>
                                                <select className="form-control" name="gender" value={gender} onChange={(event) => this.onChangeInput(event, 'gender')}>
                                                    {
                                                        genders && genders.length > 0 && genders.map((gender, index) => {
                                                            return (
                                                                <option key={index} value={gender.keyMap}>{
                                                                    language === LANGUAGES.VI ? gender.valueVi : gender.valueEn
                                                                }</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-4 mt-2">
                                                <label htmlFor="exampleFormControlSelect1">
                                                    <FormattedMessage id="manage-user.roleId" />
                                                </label>
                                                <select className="form-control" name="roleId" value={roleId} onChange={(event) => this.onChangeInput(event, 'roleId')}>
                                                    {
                                                        roles && roles.length > 0 && roles.map((role, index) => {
                                                            return (
                                                                <option key={index} value={role.keyMap}>{
                                                                    language === LANGUAGES.VI ? role.valueVi : role.valueEn
                                                                }</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-4 mt-2">
                                                <label htmlFor="exampleFormControlSelect1">
                                                    <FormattedMessage id="manage-user.position" />
                                                </label>
                                                <select className="form-control" name="position" value={position} onChange={(event) => this.onChangeInput(event, 'position')}>
                                                    {
                                                        positions && positions.length > 0 && positions.map((position, index) => {
                                                            return (
                                                                <option key={index} value={position.keyMap}>{
                                                                    language === LANGUAGES.VI ? position.valueVi : position.valueEn
                                                                }</option>
                                                            )
                                                        })
                                                    }
                                                    <option>Admin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit"
                                            className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning mt-4 preview-img__btn" : "btn btn-primary mt-4 preview-img__btn"}
                                            onClick={() => this.handleSaveUser()}>
                                            {
                                                this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.submit" />
                                            }
                                        </button>
                                    </div>
                                </div>
                                {this.state.isOpen && this.state.previewImgUrl &&
                                    <Lightbox
                                        mainSrc={this.state.previewImgUrl}
                                        onCloseRequest={() => this.setState({ isOpen: false })}
                                    />
                                }
                            </div>
                        </div>
                    </div>

                    <div className="container mt-5">
                        <TableManageUser handleEditUserFromParent={this.handleEditUserFromParent} action={this.state.action} />
                    </div>
                </div >
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        saveNewUser: (data) => dispatch(actions.saveNewUser(data)),

        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),

        editUserRedux: (data) => dispatch(actions.editAUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
