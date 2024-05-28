import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import userService from "../../services/userService";
import ModalUser from "./ModalUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    try {
      let res = await userService.getAllUsers();
      if (res && res.errCode === 0) {
        this.setState({ users: res.data });
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleAddNewUser = () => {
    this.setState({ isOpenModalUser: true });
  };

  toggleModalUser = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  };

  /* Lifecycle
    Run components:
    1. Run constructor -> init state
    2. Run componentDidMount (set state, call api, socket, event...)
    3. Run render
  */
  render() {
    let users = this.state.users;
    return (
      <div className="users-containter">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleModalUser={() => this.toggleModalUser()}
        />
        <div className="title text-center">Manage users</div>
        <div className="mx-1 ">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            {users &&
              users.map((user, _) => {
                return (
                  <tr>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.address}</td>
                    <td>
                      <button className="edit-icon">
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="delete-icon">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
