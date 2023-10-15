import React, { useEffect, useState } from 'react';
import Side from './side';
import Head from 'next/head';  
import { Box} from "@mui/material";
import { getOwnHashtagsByUserId,deleteHashtag } from '../pages/api/api'; // Remplacez le chemin vers le fichier api.js par le bon chemin

import {HiOutlineTrash, HiOutlineViewList } from 'react-icons/hi';
const Profile = () => {

  const [userId, setUserId] = useState(null);
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Ici, vous pouvez décoder le token pour extraire l'ID de l'utilisateur (si le champ s'appelle 'id')
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const authenticatedUserId = decodedToken.id;

      if (authenticatedUserId) {
        setUserId(authenticatedUserId);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // Maintenant que nous avons l'ID de l'utilisateur authentifié, appelons la fonction getOwnHashtagsByUserId pour récupérer les hashtags de cet utilisateur
      async function fetchOwnHashtags() {
        try {
          const ownHashtags = await getOwnHashtagsByUserId(userId);
          setHashtags(ownHashtags);
        } catch (error) {
          console.error('Erreur lors de la récupération des hashtags personnels :', error);
        }
      }

      fetchOwnHashtags();
    }
  }, [userId]);

  // Afficher les hashtags dans la console lorsque la liste est mise à jour
  useEffect(() => {
    if (hashtags.length > 0) {
      console.log('Liste des hashtags :', hashtags);  
    }
  }, [hashtags]);

  // Supprimer un hashtag par son ID
  const handleDeleteHashtag = async (id) => {
    try {
      // Appelez la fonction deleteHashtag de l'API
      await deleteHashtag(id);

      // Une fois que la suppression réussit, mettez à jour la liste des hashtags
      setHashtags((prevHashtags) => prevHashtags.filter((hashtag) => hashtag._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du hashtag :', error);
    }
  };


  return (  
    <>
    <Head>
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />
  </Head>
    <div className="font-sans  bg-gray-100 flex ">
    <div >
          <Side />
        </div>

      <div className="grid grid-cols-3  bg-slate-100 ml-8 mt-8 ">
      {hashtags.map((hashtag) => (
        <div key={hashtag._id} className="bg-blue-300 w-52 h-72 m-8 static rounded-lg">
          <div className="bg-white w-52 h-72 -m-2 hover:m-0 absolute rounded-lg shadow-lg hover:shadow-2xl transition-all duration-150 ease-out hover:ease-in">
            <div className="relative flex w-auto pl-4 flex-initial mt-2">
              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-300">
                <i className="fas fa-hashtag"></i>
              </div>
              <h1 className="m-4 text-2xl font-bold">{hashtag.hashtag}</h1>
            </div>

            <hr className="m-4 rounded-2xl border-t-2" />

            <div className="m-4 text-sm">
              open the view list and learn about your Hachtag !
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <br />
                <span className="font-semibold text-xl text-blueGray-700">122</span>
                <h5 className="text-blueGray-400 uppercase font-bold text-xs">Tweets</h5>
              </div>
            </div>

            <Box display="flex">
              <div style={{ marginLeft: '140px', cursor: 'pointer' }}>
                <HiOutlineViewList size={30} className="text-blue-400" />
              </div>
              <div
                style={{ marginLeft: '10px', cursor: 'pointer' }}
                onClick={() => handleDeleteHashtag(hashtag._id)}
              >
                <HiOutlineTrash size={30} className="text-blueGray-700" />
              </div>
            </Box>
          </div>
        </div>
      ))}
    </div>
    </div> 
    </>    
  );
};

export default Profile;
