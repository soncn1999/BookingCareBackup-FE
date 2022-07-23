import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                firstName: '',
                lastName: '',
                gender: 1,
                roleId: 3,
                address: '',
                phonenumber: '',
                email: '',
                password: '',
            },
        }
    }

    componentDidMount() {
        let user = this.props.userEdit;
        if (user && !_.isEmpty(user)) {
            this.setState({
                userData: user
            });
        }
    }

    toggleEdit = () => {
        this.props.handleToggleEditModal();
    }

    onHandleDataForm = (event) => {
        this.setState({
            userData: {
                ...this.state.userData,
                [event.target.name]: event.target.value,
            }
        }, () => {
            console.log(this.state.userData);
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['firstName', 'lastName', 'address', 'phonenumber', 'email'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.userData[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    onHandleSubmitForm = () => {
        console.log(this.state.userData);
        if (this.checkValidateInput()) {
            this.props.handleUpdateUser(this.state.userData);
            this.toggleEdit();
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggleEdit() }} className={"Del biet"} size={this.props.size} centered>
                <ModalHeader toggle={() => { this.toggleEdit() }}>Edit user's infomation</ModalHeader>
                <ModalBody>
                    <form className="mt-2">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Firstname</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp"
                                name="firstName" placeholder="Enter Firstname" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.firstName} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputEmail1">Lastname</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp"
                                name="lastName" placeholder="Enter Lastname" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.lastName} />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleFormControlSelect1">Gender</label>
                            <select className="form-control" name="gender" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.gender}
                                disabled>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleFormControlSelect1">Role ID</label>
                            <select className="form-control" name="roleId" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.roleId}
                                disabled>
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputEmail1">Address</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp"
                                name="address" placeholder="Enter Address" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.address}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputEmail1">Phone number</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp"
                                name="phonenumber" placeholder="Enter Phonenumber" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.phonenumber}
                                disabled />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp"
                                name="email" placeholder="Enter email" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.email}
                                disabled />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                name="password" onChange={(event) => this.onHandleDataForm(event)}
                                value={this.state.userData.password}
                                disabled />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.onHandleSubmitForm() }}>Update</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggleEdit() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

