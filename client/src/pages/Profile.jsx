import { useContext } from "react";

import { AuthContext } from "../context/Authenication";

function Profile() {
  const authenication = useContext(AuthContext);
  return (
    <>
      <h1>Profile</h1>
      {authenication ? <p>{authenication}</p> : <p>Not Auth</p>}
    </>
  );
}

export default Profile;
