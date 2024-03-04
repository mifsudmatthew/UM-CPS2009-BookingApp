const token = "Hello";

export async function Post(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Autherization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.body;
  } else {
    throw new Error(`${url}: ${response.status} - ${response.statusText}`);
  }
}
