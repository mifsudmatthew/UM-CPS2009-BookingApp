/**
 * Home.jsx
 * This file contains the Home page component.
 */

import Banner from "../components/home/Banner";
import AboutUs from "../components/home/AboutUs";
import Courts from "../components/home/Courts";

/**
 * Renders the Home page component that contains the Banner, About Us, and Courts components.
 * @category Front-end
 * @returns {JSX.Element} The rendered Home page component.
 */
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
