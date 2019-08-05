import React from 'react';

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
    <div>
      <div>{props.user.name}</div>
      <div>{props.user.bio}</div>
      <button onClick={(event) => selectUser(event, props.user)}>Edit</button>
      <button onClick={(event) => deleteUser(event, props.user.id)}>Delete</button>
    </div>
  )
}

export default User;