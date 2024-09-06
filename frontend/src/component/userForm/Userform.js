import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userSlice';

const UserForm = ({ initialData, onCancel }) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token); // Récupère le token de l'utilisateur depuis le store

  // État local pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    userName: initialData.userName,
  });

  
  const [successMessage, setSuccessMessage] = useState(''); // État pour gérer le message de succès

  // Fonction pour mettre à jour l'état local lorsque l'utilisateur modifie un champ du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  // Fonction appelée lorsque l'utilisateur clique sur "Save"
  const handleSave = async () => {
    const validPayload = {};
    if (formData.userName) validPayload.userName = formData.userName;
    
    // Vérifiez si le payload est vide ou si les champs importants sont manquants
    if (Object.keys(validPayload).length === 0) {
      console.error("Aucune donnée valide à mettre à jour");
      return;
  }

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`, // Ajout du token d'authentification
        },
        body: JSON.stringify(validPayload),
      });
  

      if (!response.ok) {
        throw new Error('Failed to update user info');
      }

      const updatedData = await response.json();
      console.log ('nouvelles userdata', updatedData);

      // Met à jour le store Redux avec les nouvelles données de l'utilisateur
      dispatch(updateUser(validPayload));
      console.log('Username updated successfully:', updatedData);

       // Affiche un message de succès après la mise à jour réussie
       setSuccessMessage('Données mises à jour avec succès');

        // Efface le message après un délai, par exemple 3 secondes
        setTimeout(() => {
        setSuccessMessage('');
        }, 3000);

      // Optionnel : Afficher un message de succès ou faire autre chose après la mise à jour
      console.log('User info updated successfully');
      
    } catch (error) {
      console.error('Error updating user info:', error);
      // Optionnel : Gérer l'affichage d'un message d'erreur
    }
  };

  return (
    <div>
      <form>
        <h2>Edit userName</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className='first'
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className='first second'
            value={formData.firstName}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className='first second'
            value={formData.lastName}
            onChange={handleChange}
            disabled
          />
        </div>
        <div className='button-form'>
          <button type="button" className='edit-button larg' onClick={handleSave}>
            Save
          </button>
          <button type="button" className='edit-button larg' onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default UserForm;
