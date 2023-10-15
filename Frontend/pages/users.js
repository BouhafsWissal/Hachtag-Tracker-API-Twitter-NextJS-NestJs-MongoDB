import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './api/api'; 
import { HiOutlineMail, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineUserAdd } from 'react-icons/hi';
import Side from './side';
import { Box, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';  
import { useRouter } from 'next/router';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  //push user's email in router 
  const handleSendEmail = (email) => { 
    router.push(`/Email/${email}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();

      // Filtrer les utilisateurs ayant le rôle "user"
      const filteredUsers = usersData.filter((user) => user.role === 'user');

      setUsers(filteredUsers);
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
 

  //Edit user 
  const handleEdit = (user) => {
    setNom(user.nom);
    setPrenom(user.prenom);
    setEmail(user.email);
    setMotdepasse('');
    setEditUser(user);
    setIsOpen(true);
  };
 
  //delete user 
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

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAdd = () => {
    // Reset the form fields to add a new user
    setNom('');
    setPrenom('');
    setEmail('');
    setMotdepasse('');
    setEditUser(null); // Set editUser to null to signify adding a new user
    setIsOpen(true);
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Grid container spacing={0}>
        <Grid item xs={2} lg={3}>
          <Side />
        </Grid>
        <Grid item xs={10} lg={8}>
          <br />
          <br />
          <br />
          <Box p={2} display="flex" alignItems="center">
            <Typography variant="h5">USERS</Typography>
            <div style={{ marginLeft: '30px' }}>
              <HiOutlineUserAdd size={30} className='text-blue-800' onClick={handleAdd} />
            </div>
          </Box>

          <Paper style={{ borderRadius: '16px', margin: '25px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      FirstName
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      LastName
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Typography variant="body1">{user.nom}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{user.prenom}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{user.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <div style={{ marginLeft: '30px' }}>
                          <HiOutlinePencilAlt size={30} className='text-blue-800' onClick={() => handleEdit(user)} />
                        </div> 
                        <div style={{ marginLeft: '10px' }}>
                        <HiOutlineMail
            size={30}
            className='text-blue-800'
            onClick={() => handleSendEmail(user.email)}
          />
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          <HiOutlineTrash size={30} className='text-blue-400' onClick={() => handleDelete(user._id)} />
                        </div>   
                         
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      {/* Modal pour la modification */}
      <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto border-blue-500" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Contenu du modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block border   border-blue-800 w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-blue-700">
                {editUser ? 'Update User' : 'Add User'}
              </Dialog.Title>
 
              <div className="mt-5"> 
           
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                        FirstName
                      </label>
                      <input
                        type="text"
                        name="nom"
                        id="nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                        LastName
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        id="prenom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="motdepasse" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        name="motdepasse"
                        id="motdepasse"
                        value={motdepasse}
                        onChange={(e) => setMotdepasse(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-pink shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={closeModal}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>

    </div>
  );
};

export default Users;
