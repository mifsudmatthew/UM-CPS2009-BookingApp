import { Link } from "react-router-dom";
import { useUser } from "../context/User";

const Balance = () => {
  const { user, setUser } = useUser();

  return (
    <main className="profile">
      <div className="header-title">Balance</div>
      <section>
        {user.balance == undefined ? (
          <h4>Balance not available</h4>
        ) : (
          <h4>Your current balance is: {user.balance}</h4>
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
