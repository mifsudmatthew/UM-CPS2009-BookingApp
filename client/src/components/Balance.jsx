import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Balance = () => {
  const { user } = useUser();
  const currentBalance = user.balance || "Balance not available";

  return (
    <main className="profile">
      <div className="header-title">Balance</div>
      <section>
        <h4>Your current balance is: {currentBalance}</h4>
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
