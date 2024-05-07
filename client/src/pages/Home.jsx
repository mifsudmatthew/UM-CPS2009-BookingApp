/**
 * Home.jsx
 * This file contains the Home page component.
 */

import Banner from "../components/home/Banner";
import AboutUs from "../components/home/AboutUs";
import Courts from "../components/home/Courts";

// Function to render the Home page, which contains the Banner, About Us, and Courts components
function Home() {
  return (
    <>
      <Banner />
      <AboutUs />
      <Courts />
    </>
  );
}

export default Home; // Export the Home component
