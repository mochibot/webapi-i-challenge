import React from 'react';
import { List, Button } from 'antd';

const User = (props) => {
  const selectUser = (event, user) => {
    event.preventDefault();
    props.selectUser(user);
  }

  const deleteUser = (event, userId) => {
    event.preventDefault();
    props.deleteUser(userId);
  } 

  return (
    <List.Item>
      <List.Item.Meta title={props.user.name} description={props.user.bio}/>
      <Button icon='edit' onClick={(event) => selectUser(event, props.user)}>Edit</Button>
      <Button icon='delete' onClick={(event) => deleteUser(event, props.user.id)}>Delete</Button>
    </List.Item>
  )
}

export default User;