import React from 'react';
import { connect } from 'react-redux';
import UserList from './UserList';

const Users = ({ userList }) => (
    <div>
        <h1>Users</h1>
        <UserList users={userList} />
    </div>
)

const mapStateToProps = (state) => ({
    userList: state.dashboard.userList,
})

export default connect(mapStateToProps)(Users)