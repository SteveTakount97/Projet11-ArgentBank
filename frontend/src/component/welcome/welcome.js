import React, { useState }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserForm from '../userForm/Userform';
import { updateUser } from '../../redux/userSlice';

function WelCome() {
    const firstname = useSelector((state) => state.user.firstName);
    const lastname = useSelector ((state) => state.user.lastName);

  // État local pour gérer l'affichage du formulaire d'édition
    const [isEditing, setIsEditing] = useState(false);

  // Fonction pour gérer le clic sur le bouton "Edit Name"
 const handleEditClick = () => {
  setIsEditing(true); // Afficher le formulaire
};
 
  // Récupération des données utilisateur depuis le store Redux
  const userData = useSelector((state) => state.user);

  // Initialisation du dispatch pour envoyer des actions au store Redux
  const dispatch = useDispatch();

  // Fonction appelée lors de la sauvegarde des modifications
  const handleSave = (newData) => {
    dispatch(updateUser(newData)); // Mise à jour des données utilisateur dans le store Redux




    setIsEditing(false); // Masquer le formulaire après sauvegarde
  };

  // Fonction pour annuler l'édition
  const handleCancel = () => {
    setIsEditing(false); // Masquer le formulaire sans sauvegarder
  };
    return (
        <div className="header">
         {!isEditing ? (
        <>
          <h1>Welcome back<br />{firstname} {lastname}!</h1>
          <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
        </>
      ) : (
        // Afficher uniquement le formulaire lorsque isEditing est true
        <UserForm 
          initialData={userData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      </div>
    );
}

export default WelCome;
