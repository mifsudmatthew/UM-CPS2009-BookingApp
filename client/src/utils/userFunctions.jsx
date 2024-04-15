/* Stores functions that communicate with the server to
 * retrieve/set/delete user data */

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
    throw new Error("Failed to retrieve user data from the server");
  }

  return await userData.json();
};
