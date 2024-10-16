import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';  // Import the context

const UserProfile = () => {
  const { userInfo, loading } = useContext(UserContext);  // Access user info

  if (loading) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      {userInfo ? (
        <>
          <h2>Welcome, {userInfo.fname}!</h2>
          <p>Email: {userInfo.email}</p>
          <p>Address: {userInfo.address}</p>
          <p>City: {userInfo.city}</p>
          <p>Phone Number: {userInfo.pnumber}</p>
          <p>Role: {userInfo.role}</p>
        </>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default UserProfile;
