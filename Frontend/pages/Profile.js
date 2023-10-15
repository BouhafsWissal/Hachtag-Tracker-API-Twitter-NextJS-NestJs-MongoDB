import React, { useEffect, useState } from 'react';
import Side from './side';
import { getOwnHashtagsByUserId } from '../pages/api/api'
const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [ownHashtagsCount, setOwnHashtagsCount] = useState(0); 
  useEffect(() => {
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Extraire les informations du token
      const { nom, prenom, role, id, email } = parseToken(token);
      // Mettre à jour l'état avec les informations du profil
      setUserInfo({ nom, prenom, email, id, role }); 
      getOwnHashtagsByUserId(id)
      .then((hashtags) => setOwnHashtagsCount(hashtags.length))
      .catch((error) => console.error('Error fetching own hashtags:', error));
    } else {
      console.log("Le token n'est pas présent dans le local storage.");
    }
  }, []);

  const parseToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(atob(base64));

    return {
      id: decodedData.id,
      email: decodedData.email,
      nom: decodedData.nom,
      prenom: decodedData.prenom,
      role: decodedData.role,
    };
  };

  const handleEdit = () => {
    setIsModalOpen(true);
    setEditedUserInfo(userInfo);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
  };

  const updateUser = async (id, user) => {
    try {
      const response = await fetch(`http://localhost:3005/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Une erreur s'est produite lors de la mise à jour de l'utilisateur.");
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      // Appeler l'API pour mettre à jour l'utilisateur avec les nouvelles informations
      const updatedUser = await updateUser(userInfo.id, editedUserInfo);

      // Mettre à jour l'état avec les nouvelles informations de l'utilisateur
      setUserInfo(updatedUser);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      // Gérer les erreurs de mise à jour ici
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100 flex  ">
      
          <div className="border-r h-full border-gray-700 ">
          <Side />
        </div>

      {/* Card au centre */}
      <div className="card  mt-32 mb-28 w-96 ml-60 bg-white shadow-xl hover:shadow">
        
        {userInfo && (
          <>
            <img
              className="w-32 mx-auto rounded-full -mt-20 border-8 border-blue-500"
              src="https://cdn.create.vista.com/api/media/small/342766888/stock-vector-user-icon-symbol-business-people"
              alt=""
            />
            <div className="text-center mt-2 text-3xl font-medium">
              {userInfo.nom} {userInfo.prenom}
            </div>
            <div className="text-center mt-2 font-light text-sm">@{userInfo.role}</div>
            <div className="text-center font-normal text-lg">Twitter User</div>
            <div className="px-6 text-center mt-2 font-light text-sm">
              <p>Email: {userInfo.email}</p>
            </div>
            <hr className="mt-8" />
            <div className="flex p-4">
             
              <div className="w-0 border border-blue-500 ml-20"></div>
              <div className="w-1/2 text-center">
                <span className="font-bold">{ownHashtagsCount}</span> Following Hashtags
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button> 

            </div> 
            <br></br>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 w-96 rounded-lg border border-blue-500">
            <h2 className="text-xl font-medium mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label htmlFor="nom" className="block text-sm font-medium mb-1">
                lastName :
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={editedUserInfo.nom || ''}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="prenom" className="block text-sm font-medium mb-1">
                firstName:
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={editedUserInfo.prenom || ''}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedUserInfo.email || ''}
                onChange={handleInputChange}
                className="w-full border rounded p-2 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleModalClose}
                className="mr-2 bg-blue-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
