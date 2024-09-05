import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  // Vous pouvez ajouter une logique de gestion de mot de passe plus tard
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Envoi des informations d'identification au backend
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      // Log de la réponse pour débogage
      console.log('Login Response Status:', response.status);
  

      // Vérification si la requête a échoué
      if (!response.ok) {
          // Tenter de récupérer les détails de l'erreur depuis la réponse
          let errorMessage = "Erreur lors de la connexion.";

          try {
              const errorData = await response.json();
              console.log('Login Error Data:', errorData);

              // Personnaliser le message d'erreur en fonction de la réponse du backend
              if (response.status === 500) {
                  // Non autorisé : généralement pour les identifiants incorrects
                  errorMessage = "Erruer du serveur";
              } else if (response.status === 400) {
                  // Non trouvé : utilisateur inexistant
                  errorMessage = "Cet utilisateur n'existe pas!";
              } else if (errorData.message) {
                  // Autres messages d'erreur spécifiques
                  errorMessage = errorData.message;
              }
          } catch (parseError) {
              console.error('Error parsing login error response:', parseError);
              // Conserver le message d'erreur par défaut
          }

          // Afficher le message d'erreur
          alert(errorMessage);
          return; // Arrêter l'exécution de la fonction en cas d'erreur
      }

      // Si la réponse est OK, analyser les données
      const data = await response.json();
      

      // Supposons que le token se trouve dans data.body.token
      const token = data.body.token;
     

      // Stocker le token dans localStorage
      localStorage.setItem('authToken', token);
      console.log('Stored Token in localStorage:', localStorage.getItem('authToken'));

      // Afficher un message de succès
      alert("Connexion réussie!");

      // Seconde requête : Récupérer les informations utilisateur
      const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'GET', 
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Utilisation du token pour l'authentification
          },
      });


      if (!profileResponse.ok) {
          const profileErrorData = await profileResponse.json();
          console.log('Profile Error Data:', profileErrorData);
          throw new Error('Failed to fetch user profile');
      }

      const userData = await profileResponse.json();
      console.log(userData);
      
      const userName = userData.body.userName;
      console.log('Extracted username', userName);

      const id = userData.body.id;
      console.log( 'Extracted idUser', id);

      const firstName = userData.body.firstName;
      console.log('Extracted Firstname:', firstName);

      const lastName = userData.body.lastName;
      console.log('Extracted Lastname:', lastName);

      // Stocker les informations utilisateur dans Redux
      dispatch(login({
          email,  // ou d'autres informations que vous avez stockées
          token,
          id,
          firstName,
          lastName,
          userName,
      }));
      console.log('User data stored in Redux:', { email, token, firstName, lastName, id, userName });

      // Redirection après la connexion réussie
      navigate('/User');

  } catch (error) {
      console.error('Error:', error.message);
      alert("Une erreur est survenue lors de la connexion.");
  }
};

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignUp;
