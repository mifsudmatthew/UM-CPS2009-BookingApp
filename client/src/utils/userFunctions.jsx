/* Stores functions that communicate with the server to
 * retrieve/set/delete user data */

export const isAdmin = (user) => {
  if (!user) return false;
  return user.isAdmin ? true : false;
};

export const isAuthenticated = async (accessToken) => {
  if (!accessToken) return false;
  const url = "/api/authenticate";
  const options = {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  try {
    const response = await fetch(url, options);
    return response.ok;
  } catch (error) {
    console.error("Error attempting to authenticate the user:", error);
    return false;
  }
};

export const getUserData = async () => {
  const url = "/api/user";
  const options = {
    method: "GET",
  };

  const accessToken = JSON.parse(
    localStorage.getItem("accessToken")
  )?.accessToken;
  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const userData = await fetch(url, options);

  if (!userData.ok) {
    throw new Error("Failed to retrieve user data from the server");
  }

  return await userData.json();
};

export const setUserData = async (newUserData) => {
  const url = "/api/user";
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const accessToken = JSON.parse(
    localStorage.getItem("accessToken")
  )?.accessToken;
  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const userData = await fetch(url, {
    ...options,
    body: JSON.stringify(newUserData),
  });

  if (!userData.ok) {
    throw new Error("Failed to set user data on the server");
  }

  return await userData.json();
};
