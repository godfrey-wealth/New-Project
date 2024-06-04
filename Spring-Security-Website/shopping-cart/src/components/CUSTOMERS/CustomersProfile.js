import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import styled from 'styled-components';
import Decode from '../../utils/Decode';

const ADMIN_PROFILE_ENDPOINT = './api/users/profile';

const CustomersProfile = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          // If not authenticated, redirect to login page
          navigate('/login');
          return;
        }

        // Decode authentication token
        const decodedToken = Decode(authToken);
        if (!decodedToken) {
          setError('Invalid authentication token.');
          return;
        }

        // Add authentication token to headers
        const headers = { Authorization: `Bearer ${authToken}` };

        // Fetch admin profile information
        const response = await axios.get(ADMIN_PROFILE_ENDPOINT, { headers });
        setAdminInfo(response.data);
      } catch (error) {
        // Handle unauthorized access
        if (error.response && error.response.status === 401) {

          navigate('/login');
          <button >
            <Link to={"/login"}>
            </Link>
            Your are no Authorize</button>
          return;
        }
        setError('An error occurred while fetching admin information.');
      }
    };

    fetchAdminInfo();
  }, [navigate]);
  const authToken = localStorage.getItem('authToken');
  const decodedToken = Decode(authToken);
  return (
    <Container>
      {error && <Error>{error}</Error>}
      {adminInfo && (
        <ProfileCard>
          <ProfileHeading>Admin Profile</ProfileHeading>
          <ProfileInfo>
            <ProfileItem>
              <strong>Name:</strong> {adminInfo.firstname}
            </ProfileItem>
            <ProfileItem>
              <strong>Last Name:</strong> {adminInfo.lastname}
            </ProfileItem>
           <ProfileItem>
              <strong>User Name:</strong> {adminInfo.username}
            </ProfileItem>
            <ProfileItem>
              <strong>Email:</strong> {adminInfo.email}
            </ProfileItem>
            <ProfileItem>
              <strong>Role:</strong> {decodedToken.roles}
            </ProfileItem>
            {/* Add more profile information as needed */}
          </ProfileInfo>
        </ProfileCard>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const ProfileCard = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ProfileHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const ProfileInfo = styled.div``;

const ProfileItem = styled.div`
  margin-bottom: 10px;

  strong {
    margin-right: 10px;
    font-weight: bold;
  }
`;

const Error = styled.div`
  color: red;
`;

export default CustomersProfile;
