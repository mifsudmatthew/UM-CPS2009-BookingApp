import Banner from "../components/Banner";
import AboutUs from "../components/AboutUs";
import Courts from "../components/Courts";

import { useAuth } from "../context/Auth";

function Home() {
  const { token, setToken } = useAuth();

  console.log(token);
  const handleUpdateToken = () => {
    setToken("Hello");
  };

  return (
    <>
      <Banner />
      <button onClick={handleUpdateToken}>CLick Me</button>
      <AboutUs />
      <Courts />
    </>
  );
}

export default Home;
