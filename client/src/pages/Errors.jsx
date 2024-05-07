/**
 *  Errors.jsx
 */

import { errorImage } from "../components/Icons";

function Errors() {
  return (
    <div>
      <h2> Sorry, the page you are looking for does not exist.</h2>
      <img src={errorImage} alt="Error" />
    </div>
  );
}

export default Errors;
