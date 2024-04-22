export const Post = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${url}: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while fetching data:", error);
      throw error;
    });
};

export const getServerStatus = async () => {
  await fetch("/server-status")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Server is not responding: ${response.status} - ${response.statusText}`
        );
      }
      return true;
    })
    .catch((error) => {
      throw new Error(`Error while fetching data: ${error}`);
    });
};

export const getUpdatedToken = async () => {
  try {
    const response = await fetch("/api/token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });

    const data = response.json();

    if (!response.ok) {
      console.error(data.error);
      return "";
    }

    return data.accesstoken;
  } catch (error) {
    console.error(error);
    return "";
  }
};
