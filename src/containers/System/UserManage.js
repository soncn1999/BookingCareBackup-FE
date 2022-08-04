import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, deleteUser, createNewUser, updateUser } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emiter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            userEdit: {}
        };
    }

    /**Life cycle:
     * Run component:
     * 1. Run constructor => initialState
     * 2. Did mount
     * 3. Render
     */

    async componentDidMount() {
        // let response = await getAllUsers('ALL');
        // console.log('get User from DB', response);
        // if (response && response.errCode === 0) {
        //     this.setState({ arrUsers: response.users });
        // }
        this.handleGetAllUsers();
    }

    handleGetAllUsers = async () => {
        try {
            let response = await getAllUsers('ALL');
            console.log('get User from DB', response);
            if (response && response.errCode === 0) {
                this.setState({ arrUsers: response.users });
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleAddNewUser = async (user) => {
        try {
            let response = await createNewUser(user);
            emitter.emit('EVENT_CLEAR_MODAL_DATA', {
                'id': 'your id',
            });
            alert(response.message);
            this.handleGetAllUsers();
        } catch (error) {
            console.error(error);
        }
    }

    handleToggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    }

    handleToggleEditModal = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
        });
    }

    handleEditUser = (user) => {
        this.handleToggleEditModal();
        this.setState({
            userEdit: { ...user }
        });
    }

    handleUpdateUser = async (user) => {
        try {
            let response = await updateUser(user);
            console.log(response.message);
            this.handleGetAllUsers();
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (user) => {
        console.log(user);
        try {
            let response = await deleteUser(user.id);
            console.log(response.message);
            this.handleGetAllUsers();
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    handleToggle={this.handleToggle}
                    handleAddNewUser={this.handleAddNewUser}
                    size="lg"
                />
                {
                    this.state.isOpenModalEdit && <ModalEditUser
                        isOpen={this.state.isOpenModalEdit}
                        handleToggleEditModal={this.handleToggleEditModal}
                        userEdit={this.state.userEdit}
                        handleUpdateUser={this.handleUpdateUser}
                        size="lg"
                    />
                }

                <h3 className="container-title mt-4">
                    <i className="fas fa-list-ol"></i> &nbsp;
                    List Users &nbsp;
                    <i className="fas fa-list-ol"></i> 
                </h3>
                <button className="btn btn-primary px-3 mt-2" onClick={() => this.handleToggle()}>
                    <i className="fas fa-user-plus"></i> &nbsp;
                    Add New User
                </button>
                <table id="customers" className="mt-4 mr-5 ml-5">
                    <tr>
                        <th>fistName</th>
                        <th>lastName</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>

                    {arrUsers.map((user) => {
                        return (<tr>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>
                                <button className="btn btn-primary button-space" onClick={() => this.handleEditUser(user)}>
                                    <i className="fas fa-edit"></i> &nbsp;
                                    Edit
                                </button>
                                <button className="btn btn-danger button-space" onClick={() => this.handleDeleteUser(user)}>
                                    <i className="fas fa-trash-alt"></i> &nbsp;
                                    Delete
                                </button>
                            </td>
                        </tr>)
                    })}
                </table>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
