import { useContext } from "react";

import { Auth } from "../context/Authenication";

function Profile() {
  const authenication = useContext(Auth);
  return (
    <>
      <h1>Profile</h1>
      {authenication ? <p>{authenication}</p> : <p>Not Auth</p>}
    </>
  );
}

export default Profile;
