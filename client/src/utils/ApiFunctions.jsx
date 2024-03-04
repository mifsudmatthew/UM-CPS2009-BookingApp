const token = "Hello";

export async function Post(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Autherization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data)=>{console.log(`${JSON.parse(data)} post func`); return data.json()})

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${url}: ${response.status} - ${response.statusText}`);
  }
}
