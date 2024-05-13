/* Stores functions that communicate with the server to
 * retrieve/set user data */

/**
 * Sends a request to the server to retrieve user data
 *
 * @param None
 *
 * @return {Object} User data
 */
export const getUserData = async () => {
  // Defining the URL and options for the request
  const url = "/api/user";
  const options = {
    method: "GET",
  };

  // Get the access token from local storage
  const accessToken = JSON.parse(
    localStorage.getItem("accessToken")
  )?.accessToken;

  // If the access token exists, add it to the headers
  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  // Send a GET request to the server to retrieve user data
  const userData = await fetch(url, options);

  // If the request fails, throw an error
  if (!userData.ok) {
    throw new Error("Failed to retrieve user data from the server");
  }

  return await userData.json();
};

/**
 * Sends a request to the server to set user data
 *
 * @param {Object} newUserData - The new user data to be set
 *
 * @return {Object} User data
 */
export const setUserData = async (newUserData) => {
  // Defining the URL and options for the request
  const url = "/api/user";
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Get the access token from local storage
  const accessToken = JSON.parse(
    localStorage.getItem("accessToken")
  )?.accessToken;

  // If the access token exists, add it to the headers
  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  // Send a PUT request to the server to set user data
  const userData = await fetch(url, {
    ...options,
    body: JSON.stringify(newUserData),
  });

  // If the request fails, throw an error
  if (!userData.ok) {
    throw new Error("Failed to set user data on the server");
  }

  return await userData.json();
};
