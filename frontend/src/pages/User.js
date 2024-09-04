import React, {useState, useEffect} from 'react';
import WelCome from '../component/welcome/welcome';
import Account from '../component/Account/Account';

function User() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token found:", token);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div>
        <WelCome />
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Veuillez vous connecter pour voir vos informations.</p>
      </div>
    );
  }

  return (
    <div>
      <main className="main bg-dark">
        <WelCome />
        <h2 className="sr-only">Accounts</h2>
        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
    </div>
  );
}

export default User;
