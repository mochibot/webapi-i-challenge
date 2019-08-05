import React, { useState, useEffect } from 'react';

const UserForm = (props) => {
  const [input, setInput] = useState({
    name: '',
    bio: ''
  })
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.activeUser) {
      setInput({
        name: props.activeUser.name,
        bio: props.activeUser.bio,
      })
    }
  }, [props.activeUser])

  const inputHandler = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
    setError('');
  }
  
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(input);
    if (!input.name || !input.bio) {
      setError('Both name and bio are required');
    } else {
      if (props.activeUser) {
        let updatedUser = {
          ...input,
          id: props.activeUser.id
        }
        props.editUser(updatedUser);
      } else {
        props.addUser(input);
      }
      setInput({
        name: '',
        bio: '',
      })
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input name='name' value={input.name} onChange={inputHandler} />
        <input name='bio' value={input.bio} onChange={inputHandler} />
        {error && <div>{error}</div>}
        <button>Submit</button>
      </form>
    </div>
  )
}

export default UserForm;