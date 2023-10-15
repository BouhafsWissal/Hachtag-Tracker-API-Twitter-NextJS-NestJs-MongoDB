import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './api/api';

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des utilisateurs :', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        nom,
        prenom,
        email,
        motdepasse,
      };

      if (editUser) {
        const updatedUser = await updateUser(editUser._id, newUser);
        console.log('Utilisateur mis à jour :', updatedUser);
      } else {
        const addedUser = await addUser(newUser);
        console.log('Utilisateur ajouté :', addedUser);
      }

      // Réinitialiser le formulaire
      setNom('');
      setPrenom('');
      setEmail('');
      setMotdepasse('');
      setEditUser(null);

      // Mettre à jour la liste des utilisateurs
      fetchUsers();
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la mise à jour ou de l\'ajout de l\'utilisateur :', error);
    }
  };

  const handleEdit = (user) => {
    setNom(user.nom);
    setPrenom(user.prenom);
    setEmail(user.email);
    setMotdepasse('');
    setEditUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      console.log('Utilisateur supprimé avec succès.');

      // Mettre à jour la liste des utilisateurs
      fetchUsers();
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur :', error);
    }
  };

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Nom: {user.nom}, Prénom: {user.prenom}, Email: {user.email}
            <button onClick={() => handleEdit(user)}>Modifier</button>
            <button onClick={() => handleDelete(user._id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <h1>Ajouter/Modifier un utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
        </label>
        <br />
        <label>
          Prénom:
          <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Mot de passe:
          <input type="password" value={motdepasse} onChange={(e) => setMotdepasse(e.target.value)} />
        </label>
        <br />
        <button type="submit">{editUser ? 'Mettre à jour' : 'Ajouter l\'utilisateur'}</button>
      </form>
    </div>
  );
};

export default AddUser;
