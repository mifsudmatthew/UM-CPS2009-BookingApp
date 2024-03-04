export function Post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
}
