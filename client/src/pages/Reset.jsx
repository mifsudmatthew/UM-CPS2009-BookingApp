export default function Reset() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Data:");
    try {
      const response = await fetch("/api/reset", {
        method: "GET"
      });

      if (response.ok) {
        // Handle response here
        console.log("Success:");
      } else {
        // Handle errors here
        console.error("Error:");
      }
    } catch (error) {
      console.error("Error:");
    }
  };


  return (
    <>
      <h1>Reset</h1>
      <button onClick={handleSubmit}>RESET PASSWORD</button>
    </>

  );
}
