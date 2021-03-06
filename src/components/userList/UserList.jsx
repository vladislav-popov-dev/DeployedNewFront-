import React, { useState, useEffect } from 'react';
import SearchUser from '../searchUser/SearchUser';
import UserCard from '../userCard/UserCard';
import NotFound from '../notFound/NotFound';
import AddUser from '../addUser/AddUser';

import UserListStyle from './UserList.module.css';

import { connect } from 'react-redux';
import { axiosUsers } from '../../actions/userActions';
import Loading from '../loading/Loading';
import Logout from '../logout/Logout';


const UserList = (props) => {
  const { users, loading, token, email } = props;


  const [resSearch, setResSearch] = useState('');

  const filtredUsers = users.filter((user) => user.name.toLowerCase().includes(resSearch.toLowerCase().trim()));  //Фильтрация поиска

  return (
    <div>
      <div className={UserListStyle.header}>
        <SearchUser setResSearch={setResSearch} />
        <Logout email={email} />
      </div>
      <AddUser token={token} />
      {loading && <Loading />}
      {!loading &&
        <div className={UserListStyle.container}>
          {filtredUsers.length ? (filtredUsers.map((user) => <UserCard key={user._id} user={user} token={token} />)) : (<NotFound />)}
        </div>}
    </div>
  )
}



// export default UserList;

const mapStateToProps = (state) => ({
  users: state.userReducer.users,
  loading: state.userReducer.loading,
  token: state.userReducer.token,
  email: state.userReducer.email,
})

const mapActions = { axiosUsers };

export default connect(mapStateToProps, mapActions)(UserList);
