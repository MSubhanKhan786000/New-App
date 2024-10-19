import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserProfile = () => {
  const { userInfo, loading } = useContext(UserContext);

  const capitalizeName = (fname, lname) => {
    const fullName = `${fname} ${lname}`;
    return fullName.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#141055] text-white">
        <p className="text-xl font-semibold animate-pulse">
          Loading user details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141055] p-6 flex justify-center items-center">
      {userInfo ? (
        <div className="bg-white shadow-2xl rounded-lg p-6 sm:p-10 max-w-md sm:max-w-lg w-full">
          {/* Capitalizing full name and displaying it */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center py-3 sm:py-4 bg-[#141055] rounded-md">
            Welcome, {capitalizeName(userInfo.fname, userInfo.lname)}!
          </h2>
          <div className="text-base sm:text-lg space-y-4 sm:space-y-6">
            {/* Email */}
            <p className="flex items-center bg-[#FC0149] text-white px-3 sm:px-4 py-2 rounded-md shadow-md">
              <span className="font-semibold mr-2">Email:</span>{" "}
              {userInfo.email}
            </p>
            {/* Address */}
            <p className="flex items-center bg-[#FC0149] text-white px-3 sm:px-4 py-2 rounded-md shadow-md">
              <span className="font-semibold mr-2">Address:</span>{" "}
              {userInfo.address}
            </p>
            {/* City */}
            <p className="flex items-center bg-[#FC0149] text-white px-3 sm:px-4 py-2 rounded-md shadow-md">
              <span className="font-semibold mr-2">City:</span> {userInfo.city}
            </p>
            {/* Phone Number */}
            <p className="flex items-center bg-[#FC0149] text-white px-3 sm:px-4 py-2 rounded-md shadow-md">
              <span className="font-semibold mr-2">Phone Number:</span>{" "}
              {userInfo.pnumber}
            </p>
            {/* Role */}
            <p className="flex items-center bg-[#FC0149] text-white px-3 sm:px-4 py-2 rounded-md shadow-md">
              <span className="font-semibold mr-2">Role:</span> {userInfo.role}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center bg-[#141055] h-screen text-white">
          <p className="text-xl font-semibold">
            No user information available.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
