/**
 * @file Errors.jsx
 * @desc This file defines the Error page component.
 */

import { errorImage } from "../components/Icons";

/**
 * Renders the Error page component.
 * @category Front-end
 * @returns {JSX.Element} The rendered Error page component.
 */
function Errors() {
  return (
    <div>
      <h2> Sorry, the page you are looking for does not exist.</h2>
      <img src={errorImage} alt="Error" />
    </div>
  );
}

export default Errors; // Export the Errors component
