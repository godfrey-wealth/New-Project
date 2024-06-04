import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { CartContext } from '../CUSTOMERS/ProductStore/CartContext';
import Decode from '../../utils/Decode';
import styled from 'styled-components';

const USER_PROFILE_ENDPOINT = './api/users/profile';
const USER_LIST_ENDPOINT = './api/users';

const UserProfileList = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');

    if (!authToken || !role) {
      setError('You are not authenticated. Please log in.');
      return;
    }

    const decodedToken = Decode(authToken);
    if (!decodedToken) {
      setError('Invalid authentication token.');
      return;
    }

    axios.get(USER_PROFILE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      setUser(response.data);
      setAuth(true);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        setError('You are not authenticated. Please log in.');
      } else {
        setError('An error occurred while fetching user profile.');
      }
    });

    axios.get(USER_LIST_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(response => {
      setUsers(response.data.users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      setError('An error occurred while fetching users.');
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    setAuth(false);
    setUser(null);
    navigate('/login');
  };
  const authToken = localStorage.getItem('authToken');
  const decodedToken = Decode(authToken);
  return (
    <Container className='container mt-4'>
      {error && <Error>{error}</Error>}
      {auth && user && (
        <div>
          <h3>You are Authorized - {user.firstname}</h3>
          <UserTable>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Roles</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.roles}</td>
                  <td>
                    {/* <ActionButtons>
                      <EditButton to={`/edit/${user.id}`}>Edit</EditButton>
                      <DeleteButton to={`/delete/${user.id}`}>Delete</DeleteButton>
                    </ActionButtons> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </UserTable>
          <LogoutButton className='btn btn-danger' onClick={handleLogout}>
            Logout
          </LogoutButton>
          {/* <AddButton to="/add" className='btn btn-primary'>Add User</AddButton> */}
        </div>
      )}
      {!auth && (
        <div>
          <h3>Login Now</h3>
          <Link to='/login' className='btn btn-primary'>
            Login
          </Link>
        </div>
      )}

      {/* Render success message */}
      <div>
        {/* <h1>Thank you for your Purchase</h1> */}
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Error = styled.div`
  color: red;
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const ActionButtons = styled.div`
  display: flex;
`;

const ActionButton = styled(Link)`
  margin-right: 5px;
  cursor: pointer;
  text-decoration: none;
`;

const EditButton = styled(ActionButton)`
  color: #007bff;
`;

const DeleteButton = styled(ActionButton)`
  color: #dc3545;
`;

const LogoutButton = styled.button`
  margin-top: 10px;
`;

const AddButton = styled(Link)`
  margin-top: 10px;
  text-decoration: none;
`;

export default UserProfileList;




