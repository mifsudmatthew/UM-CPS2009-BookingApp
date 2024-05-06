// Errors.jsx
import errorImage from "../assets/sad_tennis.webp";

function Errors() {
  return (
    <div>
      <h1> Sorry, the page you are looking for does not exist.</h1>
      <img src={errorImage} alt="Error" />
    </div>
  );
}

export default Errors;
