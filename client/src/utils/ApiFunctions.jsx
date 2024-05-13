/* Stores utility functions that communicate with the server to send/receive data*/

/**
 * Sends a POST request to the server with the given data
 *
 * @param {String} url - The URL to send the request to
 *
 * @param {Object} data - The data to send in the request
 *
 * @return {Object} The response from the server
 */
export const Post = (url, data) => {
  // Send a POST request to the server with the given data, on the given route
  return fetch(url, {
    method: "POST",
    headers: {
      // Include the access token in the headers
      Authorization: `Bearer ${JSON.parse(
        // Get the access token from local storage
        localStorage.getItem("accessToken")
      )}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Convert the data to a JSON string
  }).then((response) => {
    try {
      return response.json();
    } catch (err) {
      throw new Error(
        `${url}: ${response.status} - ${response.statusText} - ${err}`
      );
    }
  });
};

/**
 * Sends a GET request to the server on the given route
 *
 * @param {String} url - The URL to send the request to
 *
 * @return {Object} The response from the server
 */
export const Get = (url) => {
  // Send a GET request to the server on the given route
  return fetch(url, {
    method: "GET",
    headers: {
      // Include the access token in the headers
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken") // Get the access token from local storage
      )}`,
    },
  }).then((response) => {
    try {
      return response.json();
    } catch (err) {
      throw new Error(
        `${url}: ${response.status} - ${response.statusText} - ${err}`
      );
    }
  });
};

/**
 * Obtains the server status by sending a GET request to the server
 *
 * @param None
 *
 * @return {Boolean} True if the server is responding, false otherwise
 */
export const getServerStatus = async () => {
  // Send a GET request to the server to check the server status
  await fetch("/server-status")
    .then((response) => {
      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error(
          `Server is not responding: ${response.status} - ${response.statusText}`
        );
      }
      // Return true if the server is responding
      return true;
    })
    .catch((error) => {
      throw new Error(`Error while fetching data: ${error}`);
    });
};

/**
 * Obtains the updated access token by sending a GET request to the server
 *
 * @param None
 *
 * @return {String} Updated access token
 */
export const getUpdatedToken = async () => {
  try {
    // Send a GET request to the server to obtain the updated access token
    const response = await fetch("/api/token", {
      method: "GET",
      headers: {
        // Include the access token in the headers
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") // Get the access token from local storage
        )}`,
      },
    });

    // If the response is not OK, throw an error
    const data = await response.json();

    // If the response is not OK, throw an error
    if (!response.ok) {
      console.error(data.error);
      return "";
    }

    // Return the updated access token
    return data.accesstoken;
  } catch (error) {
    // Log an error if the request fails
    console.error(error);
    return "";
  }
};
