import React from 'react';
import { List } from 'antd';
import User from './User';

const UserList = (props) => {
  return (
    <List className='user-list' bordered itemLayout="horizontal">
      {props.users.map(item => <User key={item.id} user={item} selectUser={props.selectUser}deleteUser={props.deleteUser} />)}
    </List>
  )
}

export default UserList; 