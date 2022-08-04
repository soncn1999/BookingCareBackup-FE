import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    }

    render() {
        let { userRedux } = this.state;
        return (
            <Fragment>
                <table id="customers" className="mt-4 mr-5 ml-5">
                    <tr>
                        <th>fistName</th>
                        <th>lastName</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {
                        userRedux && userRedux.length > 0 && userRedux.map((user, index) => {
                            return (
                                <tr key={index}>
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
                                </tr>
                            );
                        })
                    }

                </table>

                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.DeleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);


