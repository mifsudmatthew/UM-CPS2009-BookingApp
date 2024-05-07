/**
 *  Errors.jsx
 *  This file contains the Error page component.
 */

import { errorImage } from "../components/Icons";

// Function to render the Error page
function Errors() {
  return (
    <div>
      <h2> Sorry, the page you are looking for does not exist.</h2>
      <img src={errorImage} alt="Error" />
    </div>
  );
}

export default Errors; // Export the Errors component
