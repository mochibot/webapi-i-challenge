import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  let baseUrl = 'http://localhost:8000';

  useEffect(() => {
    axios.get(baseUrl + '/users')
      .then(response => {
        console.log('fetch users success: ', response);
        setUsers(response.data);
      })
      .catch(error => {
        console.log('fetch users error: ', error);
      })
  }, [baseUrl]);

  const addUser = (user) => {
    axios.post(baseUrl + '/users', user)
      .then(response => {
        console.log('add user success: ', response);
        return axios.get(baseUrl + '/users')
          .then(response => {
            console.log('fetch users success: ', response);
            setUsers(response.data);
          })
          .catch(error => {
            console.log('fetch users error: ', error);
          })
      })
      .catch(error => {
        console.log('add user error: ', error);
      })
  }

  const deleteUser = (userId) => {
    axios.delete(baseUrl + `/users/${userId}`)
      .then(response => {
        console.log('delete user success: ', response);
        setActiveUser(null);
        return axios.get(baseUrl + '/users')
          .then(response => {
            console.log('fetch users success: ', response);
            setUsers(response.data);
          })
          .catch(error => {
            console.log('fetch users error: ', error);
          })
      })
      .catch(error => {
        console.log('delete user error: ', error)
      })
  }

  const editUser = (user) => {
    axios.put(baseUrl + `/users/${user.id}`, user)
      .then(response => {
        console.log('edit user success: ', response);
        setActiveUser(null);
        return axios.get(baseUrl + '/users')
          .then(response => {
            console.log('fetch users success: ', response);
            setUsers(response.data);
          })
          .catch(error => {
            console.log('fetch users error: ', error);
          });
      })
      .catch(error => {
        console.log('edit user error: ', error);
      })
  }

  const selectUser = (user) => {
    setActiveUser(user);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>User app</div>
      </header>
      <div className='App-content'>
        <UserForm addUser={addUser} activeUser={activeUser} editUser={editUser}/>
        <UserList users={users} deleteUser={deleteUser} selectUser={selectUser}/>
      </div>
    </div>
  );
}

export default App;
