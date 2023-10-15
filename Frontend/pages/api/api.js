const BASE_URL = 'http://localhost:3005'; 

//get list of users
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error('Une erreur s\'est produite lors de la récupération des utilisateurs.');
  }

  return response.json();
};
//add user and register 
export const addUser = async (user) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur.');
  }

  return response.json();
};
//update user
export const updateUser = async (id, user) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.');
  }

  return response.json();
};  
//delete user 
export const deleteUser = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Une erreur s\'est produite lors de la suppression de l\'utilisateur.');
    }
  };
  // login  
export const login = async (email, motdepasse) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      motdepasse,
    }),
  });

  if (!response.ok) {
    throw new Error('Une erreur s\'est produite lors de la connexion.');
  }

  const data = await response.json();
  return data.token;
}; 

//Recherche de publications par Hachtag 
export const searchTweetsByHashtag = async (hashtag) => {
  try {
    const response = await fetch(`${BASE_URL}/twitter/hashtag/${hashtag}`);

    if (!response.ok) {
      throw new Error('Une erreur s\'est produite lors de la récupération des tweets par hashtag.');
    }

    return response.json();
  } catch (error) {
    throw new Error('Une erreur s\'est produite lors de la récupération des tweets par hashtag.');
  } 
  
};

// Ajout d'un objet OwnHashtags
export const addOwnHashtags = async (ownHashtags) => {
  try {
    const response = await fetch(`${BASE_URL}/ownHashtags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ownHashtags),
    });

    if (!response.ok) {
      throw new Error('Une erreur s\'est produite lors de l\'ajout de l\'objet OwnHashtags.');
    }

    return response.json();
  } catch (error) {
    throw new Error('Une erreur s\'est produite lors de l\'ajout de l\'objet OwnHashtags.');
  }
};  
// Récupérer les hashtags personnels (OwnHashtags) d'un utilisateur par son ID
export const getOwnHashtagsByUserId = async (idUser) => {
  try {
    const response = await fetch(`${BASE_URL}/ownHashtags/byUserId/${idUser}`);

    if (!response.ok) {
      throw new Error('Une erreur s\'est produite lors de la récupération des hashtags personnels.');
    }

    return response.json();
  } catch (error) {
    throw new Error('Une erreur s\'est produite lors de la récupération des hashtags personnels.');
  }
};  
// delete ownHashtags
export const deleteHashtag = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/ownHashtags/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Une erreur s\'est produite lors de la suppression du hashtag.');
    }
  } catch (error) {
    throw new Error('Une erreur s\'est produite lors de la suppression du hashtag.');
  }
};
// Get all OwnHashtags
export const getAllOwnHashtags = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ownHashtags`);

    if (!response.ok) {
      throw new Error('Une erreur s\'est produite lors de la récupération des hashtags.');
    }

    return response.json();
  } catch (error) {
    throw new Error('Une erreur s\'est produite lors de la récupération des hashtags.');
  }
};

















