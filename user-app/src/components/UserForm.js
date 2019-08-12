import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button } from 'antd';

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
      <Form className='user-form' onSubmit={submitHandler}>
        <Input prefix={<Icon type='user'/>} name='name' value={input.name} placeholder='Name' onChange={inputHandler} />
        <Input prefix={<Icon type='solution' />} name='bio' value={input.bio} placeholder='Bio' onChange={inputHandler} />
        {error && <div>{error}</div>}
        <Button onClick={submitHandler}>Submit</Button>
      </Form>
    </div>
  )
}

export default UserForm;