import { useToken } from "../hooks/useToken";

export async function Post(url, data) {
  const { getToken } = useToken();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${url}: ${response.status} - ${response.statusText}`);
  }
}
