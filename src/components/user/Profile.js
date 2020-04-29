import React, { useState, useEffect } from "react";

function Profile({ auth }) {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    debugger;
    auth.getProfile((profile, error) => {
      setProfile({ profile });
    });
  }, []);
  return (
    <>
      <h1>Profile</h1>
      <p>{profile.nickname}</p>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
}

export default Profile;
