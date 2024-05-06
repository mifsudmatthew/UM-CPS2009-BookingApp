import { Link } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";

/**
 * Renders the Balance component.
 *
 * @returns {JSX.Element} The rendered Balance component.
 */
const Balance = () => {
  const { user } = useProfile(); // Retrieve user data once when the component loads

  return (
    <main className="profile">
      <div className="header-title">Balance</div>
      <section>
        {user.balance == undefined ? ( // Check if the user's balance is undefined
          <h4>Balance not available</h4> // Display a message if the balance is undefined
        ) : (
          // If the balance is defined
          <h4>Your current balance is: {user.balance}</h4> // Display the user's balance
        )}
      </section>
      <section>
        <div className="signup">
          <h4>
            Do you wish to top up your balance?{" "}
            <Link to="/profile/topup" className="signup-link">
              Click here
            </Link>
          </h4>
        </div>
      </section>
    </main>
  );
};

export default Balance;
