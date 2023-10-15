import React, { useState, useEffect } from 'react';
import Side from './side';
import { getUsers, getAllOwnHashtags, getOwnHashtagsByUserId } from '../pages/api/api';
import { Box } from '@mui/material';
import { HiOutlineTrash, HiOutlineViewList } from 'react-icons/hi';
import Link from 'next/link';

import Head from 'next/head';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [ownHashtags, setOwnHashtags] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserHashtags, setSelectedUserHashtags] = useState([]); // Utiliser une nouvelle variable pour stocker les hashtags de l'utilisateur sélectionné
  const [showHashtags, setShowHashtags] = useState(false);
  const [totalUserHashtags, setTotalUserHashtags] = useState(0); // Utiliser une nouvelle variable pour stocker le nombre total de ownHashtags
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Fetch the users and update the state with the list
    getUsers()
      .then((fetchedUsers) => {
        // Filter out admin users
        const nonAdminUsers = fetchedUsers.filter((user) => user.role !== 'admin');
        setUsers(nonAdminUsers);
        setTotalUsers(nonAdminUsers.length);
        console.log(nonAdminUsers);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });

    // Fetch the own hashtags and update the state with the list
    getAllOwnHashtags()
      .then((hashtags) => {
        setOwnHashtags(hashtags);
        // Mettre à jour totalUserHashtags avec le nombre de hashtags récupérés
        setTotalUserHashtags(hashtags.length);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  }, []);

 
  const handleHashtagIconClick = (userId) => {
    // Mettez à jour l'état avec l'ID de l'utilisateur sélectionné
    setSelectedUserId(userId);
    console.log("ID de l'utilisateur sélectionné :", userId); // Ajout du console.log ici

    // Appelez la fonction pour récupérer les hashtags personnels de l'utilisateur
    getOwnHashtagsByUserId(userId)
      .then((hashtags) => {
        // Mettez à jour l'état avec les hashtags récupérés pour cet utilisateur spécifique
        setSelectedUserHashtags(hashtags);
        console.log("Hashtags du user sélectionné :", hashtags);
      })
      .catch((error) => {
        console.error(error);
        // Gérez l'erreur si nécessaire
      });
  };
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        />
      </Head>
      <div className="font-sans min-h-screen bg-blue-950 flex flex-row items-baseline ">
        <div className="border-r border-gray-700 ">
          <Side />
        </div>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2  mt-10">
          {/* Card au centre */}
          <div className="w-96 ml-8 rounded-lg shadow-xs overflow-hidden mt-0  bg-blue-100 dark:bg-gray-800">
            <div className="p-8 flex items-center">
              <div className="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="w-96 ml-8 rounded-lg shadow-xs overflow-hidden mt-0 bg-blue-100 dark:bg-gray-800">
            <div className="p-8 flex items-center">
              <div className="text-white p-3 mr-4 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-300">
                <i className="fas fa-hashtag"></i>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total Saved Hashtags</p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{totalUserHashtags}</p>
              </div>
            </div>
          </div>

          <div className="w-220 ml-8 rounded-lg shadow-xs overflow-hidden mt-2 bg-blue-100 dark:bg-gray-800">
            <div className="w-full max-w-2xl mx-auto bg-blue-100 shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
                <Box display="flex">
                  <div className="mb-2 text-m font-semibold text-gray-600 w-6 dark:text-gray-400">Users Interest</div>
                  <div style={{ marginLeft: '280px', cursor: 'pointer' }}>
                    {/* Utilisation de Link pour accéder à TweetDetails */}
                    <Link href={`/users`}>
                      <HiOutlineViewList size={30} className="text-blue-700" />
                    </Link>
                  </div>
                </Box>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left"> Full Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Hashtags</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {/* Map through the list of non-admin users and generate rows */}
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-800">
                                {user.nom} {user.prenom}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{user.email}</div>
                          </td>
                          <td className="p-4 whitespace-nowrap w-2">
                            <i
                              className="fas fa-hashtag text-blue-500 w-2 cursor-pointer"
                              onClick={() => handleHashtagIconClick(user._id)}
                            ></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {selectedUserId !== null && selectedUserHashtags.length > 0 && (
            <div className="mt-4 w-full px-5 ml-2">
              <div className="relative flex flex-col min-w-0 break-words bg-blue-100 rounded mb-6 xl:mb-0 shadow-lg">
                <div className="p-4">
                  <p className="font-semibold text-gray-600 text-left">This User is interested in :</p>
                  <ul>
                    {selectedUserHashtags.map((hashtag) => (
                      <li key={hashtag.id} className="px-3 py-2 mb-2 rounded text-blue-600 ">
                         <i className="fas fa-hashtag text-blue-500 w-2  mr-3 cursor-pointer" ></i>{hashtag.hashtag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
