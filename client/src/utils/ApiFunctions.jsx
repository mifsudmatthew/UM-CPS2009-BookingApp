export async function Post(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response;
  } else {
    throw new Error(`${url}: ${response.status} - ${response.statusText}`);
  }
}
