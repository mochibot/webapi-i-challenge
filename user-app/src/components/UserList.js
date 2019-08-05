import React from 'react';
import User from './User';

const UserList = (props) => {
  return (
    <div>
      {props.users.map(item => <User key={item.id} user={item} selectUser={props.selectUser}deleteUser={props.deleteUser} />)}
    </div>
  )
}

export default UserList; 