import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, deleteUser } from '../../services/userService';
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
        };
    }

    /**Life cycle:
     * Run component:
     * 1. Run constructor => initialState
     * 2. Did mount
     * 3. Render
     */

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        console.log('get User from DB', response);
        if (response && response.errCode === 0) {
            this.setState({ arrUsers: response.users });
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    handleDeleteUser = (id) => { 
        deleteUser(id);
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleModal={this.handleAddNewUser}
                    size="lg"
                />
                <h3 className="container-title mt-4">List Users</h3>
                <button className="btn btn-primary px-3 mt-2" onClick={() => this.handleAddNewUser()}>Add New User</button>
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
                                <button className="btn btn-primary button-space">Edit</button>
                                <button className="btn btn-danger button-space" onClick={() => this.handleDeleteUser(user.id)}>Delete</button>
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
