import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { searchTweetsByHashtag } from './api/api'; // Update this with the correct path to your API file.
import { addOwnHashtags } from './api/api';  

const IndexPage = () => {
  const [userFname, setUserFname] = useState(null);
  const [userId, setUserID] = useState(null);
  const [userLname, setUserLname] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [displayedQuery, setDisplayedQuery] = useState('Twitter_vs_X'); // Afficher les publications du hashtag #twitter_vs_X au chargement initial.
  const [showAddToList, setShowAddToList] = useState(false); 
  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const results = await searchTweetsByHashtag(searchQuery);
      setSearchResults(results);
      setDisplayedQuery(searchQuery); // Mettre à jour displayedQuery avec la valeur actuelle de searchQuery
  
      // Ajout de la condition pour afficher la partie "Add to your list" uniquement lorsque la recherche est effectuée avec la touche "Entrée"
      if (e.key === 'Enter') {
        setShowAddToList(true);
      }
  
      console.log(results);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la recherche des tweets par hashtag.');
    }
  };
 

  const fetchInitialTweets = async () => {
    try {
      // Fetch tweets with hashtag "#Twitter_vs_X"
      const results1 = await searchTweetsByHashtag('Twitter_vs_X');
      // Fetch tweets with hashtag "#AhmedHafnaoui"
      const results2 = await searchTweetsByHashtag('Ahmed Hafnaoui');

      // Combine the results from both hashtags
      const combinedResults = [...results1, ...results2];

      // Separate the results by hashtags
      const tweetsFromTwitter = combinedResults.filter(tweet => tweet.hashtag === 'Twitter_vs_X');
      const tweetsFromAhmed = combinedResults.filter(tweet => tweet.hashtag === 'Ahmed Hafnaoui');

      // Combine the tweets alternatively
      const alternateTweets = [];
      const minLength = Math.min(tweetsFromTwitter.length, tweetsFromAhmed.length);
      for (let i = 0; i < minLength; i++) {
        alternateTweets.push(tweetsFromTwitter[i]);
        alternateTweets.push(tweetsFromAhmed[i]);
      }

      setSearchResults(alternateTweets);
    } catch (error) {
      console.error('Error fetching initial tweets:', error.message);
    }
  };
  useEffect(() => {
    // Function to fetch tweets with hashtag "#Twitter_vs_X" on initial page load
    fetchInitialTweets();
    
   
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('token');
  
    if (token) {
      // Extraire les données du token
      const userData = parseToken(token);
      setUserFname(userData.nom);
      setUserLname(userData.prenom);
      setUserRole(userData.role);
      setUserID(userData.id);
    } else {
      console.log('Le token n\'est pas présent dans le local storage.');
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

  const router = useRouter(); // Récupérer l'objet de routage pour la redirection

  const handleLogOut = () => {
    // Supprimer le token du local storage pour déconnecter l'utilisateur
    localStorage.removeItem('token');

    // Rediriger l'utilisateur vers la page de landing (ou autre page appropriée)
    router.push('/Landing'); // Assurez-vous d'ajuster le chemin selon votre configuration de routes
  }; 

  const handleAddToYourList = async () => {
    try {
      // Create an object containing userId and hashtag
      const ownHashtagsObject = {
        idUser: userId,
        hashtag: displayedQuery,
      };

      // Call the API to add the object to the server
      await addOwnHashtags(ownHashtagsObject);

      // Show a success message or perform other actions after successful addition
      console.log('Object added successfully:', ownHashtagsObject);
    } catch (error) {
      console.error('Error while adding the object:', error.message);
    }
  }; 
    //handle keyPress
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        setSearchResults([]); // Réinitialiser les résultats de recherche avant de lancer une nouvelle recherche
        handleSearch(e);
      }
    };
  

  return ( 

    <div className="bg-blue-950">
      <div className="flex">
        <div className="w-2/5 text-white  pl-32 py-4 h-auto">
          {/* left menu */}
          <svg viewBox="0 0 24 24" className="h-12 w-12 text-white" fill="currentColor">
      <g>
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
      </g>
    </svg>
    <nav className="mt-5 px-2"> 
    {(userRole === 'admin' || userRole === 'user') && (
      <a href="clone" className="group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full bg-blue-800 text-blue-300">
        <svg className="mr-4 h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path width="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"/>
        </svg>
        Home
      </a> )} 
      {userRole === 'admin' && (
      <a href="Dashboard" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-blue-800 hover:text-blue-300">
        <svg className="mr-4 h-6 w-6" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
        </svg>
        Explore
      </a> )}
      {(userRole === 'admin' || userRole === 'user') && (
      <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
  <svg className="mr-4 h-6 w-6" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
 Notifications
</a> )} 
{userRole === 'admin' && (
<a href="sendEmail" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
  <svg className="mr-4 h-6 w-6" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
  Messages
</a> )} 
{userRole === 'user' && (
<a href="ownHachtags" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
  <svg className="mr-4 h-6 w-6" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
  Own-Hashtags
</a> )}
{userRole === 'admin' && (
<a href="users" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
  <svg className="mr-4 h-6 w-6" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
  Users
</a> )}
{(userRole === 'admin' || userRole === 'user') && (
    <a href="Profile" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
  <svg className="mr-4 h-6 w-6" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
  Profile
</a> )}
<a
        href="#"
        className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
        onClick={handleLogOut} // Associez la fonction handleLogOut au clic
      >
        <svg
          className="mr-4 h-6 w-6"
          fill="none"
          width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        LogOut
      </a>
      <button className="bg-blue-400 w-48 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
        Tweet
      </button>
    </nav> 

    <div className="flex-shrink-0 flex hover:bg-blue-00 rounded-full p-4 mt-6 mr-2">
        <a href="#" className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img className="inline-block h-9 w-9 rounded-full" src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png" alt="" />
            </div>
            <div className="ml-3">
              <p className="text-base leading-6 font-medium text-white">
                {userFname} {userLname}
              </p>
              <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                @{userRole}
              </p>
            </div>
          </div>
        </a>
      </div>
        </div>

        <div className="w-3/5 border border-gray-600 h-auto border-t-0"> 

        
  {/* middle wall */}
  <hr className="border-gray-600" /> 
 <hr className="border-blue-800 border-2" />  
  <br/> 
  {showAddToList && searchResults.length > 0 && (
        <div className="card bg-blue-950">
          <div className="flex p-1">
            <div className="w-1/2 text-center bg text-white mt-1">
              <span className="font-bold">#</span> {displayedQuery}
            </div>
            <div className="w-0 border border-blue-300"></div>
            <div className="w-1/2 text-center">
              <button
                onClick={handleAddToYourList}
                className="bg-blue-400 w-48 mt-0 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Add to your list !
              </button>
            </div>
          </div>
        </div>
      )}

      <br/> 
      
  {searchResults.map((tweet) => (
    <><div key={tweet._id} className="flex flex-shrink-0 p-4 pb-0">
      <a href="#" className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={tweet.content} // Remplacez par le chemin vers l'image du propriétaire du tweet
              alt="" />
          </div>
          <div className="ml-3">
            <p className="text-base leading-6 font-medium text-white">
              {tweet.owner}{' '}
              <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                @{tweet.owner}
              </span>
            </p>
          </div>
        </div>
      </a>
    </div><div className="pl-16">
        <p className="text-base width-auto font-medium text-white flex-shrink">
          {tweet.text} <span className="text-blue-400">#{tweet.hashtag}</span>
        </p>
       
      <div className="md:flex-shrink pr-6 pt-3">
        <img
          className="rounded-lg w-full h-64"
          src={tweet.content}
          alt="Woman paying for a purchase"
        />
      </div> 

      <div className="flex">
  <div className="w-full">
    <div className="flex items-center">
      <div className="flex-1 text-center">
        <a href="#" className="w-24 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
          <svg className="text-center h-6 w-6" fill="none" width="6" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <span className="ml-2">{tweet.replies}</span>
        </a>
      </div>

      <div className="flex-1 text-center py-2 m-2">
        <a href="#" className="w-24 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
          <svg className="text-center h-7 w-6" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
          </svg>
          <span className="ml-2">{tweet.retweets}</span>
        </a>
      </div>

      <div className="flex-1 text-center py-2 m-2">
        <a href="#" className="w-24 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
          <svg className="text-center h-7 w-6" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span className="ml-2">{tweet.likes}</span>
        </a>
      </div>

      <div className="flex-1 text-center py-2 m-2">
        <a href="#" className="w-24 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
          <svg className="text-center h-7 w-6" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <span className="ml-2">{tweet.views}K</span>
        </a>
      </div>
    </div>
  </div>
</div>



                


      </div><hr className="border-gray-600" />
      <hr className="border-gray-600" /></>
  ))}
</div>


 
        <div className="w-2/5 h-12">
          {/* right menu */}
          <div className="relative text-gray-300 w-80 p-5 pb-0 mr-16">
          <form onSubmit={handleSearch}>
            <button type="submit" className="absolute ml-4 mt-3 mr-4">  
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackground: "new 0 0 56.966 56.966" }} xmlSpace="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
              </svg>
            </button>
            <input
              type="search"
              name="search"
              value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search Twitter"
              className="bg-blue-800 h-10 px-10 pr-5 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow border-0"
            /> 
          </form>
        </div>
          {/* second-trending tweet section */}
          <div className="max-w-sm rounded-lg bg-blue-800 overflow-hidden shadow-lg m-4 mr-20">
            <div className="flex">
              <div className="flex-1 m-2">
                <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">Tunisia trends</h2>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a href="" className="text-2xl rounded-full text-white hover:bg-blue-800 hover:text-blue-300 float-right">
                  <svg className="m-2 h-6 w-6" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                  </svg>
                </a>
              </div>
            </div>
            <hr className="border-gray-600" />
            {/* first trending tweet */}
            <div className="flex">
              <div className="flex-1">
                <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">1 . Trending</p>
                <h2 className="px-4 ml-2 w-48 font-bold text-white">#Twitter_vs_X</h2>
                
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a href="" className="text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right">
                  <svg className="m-2 h-5 w-5" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </a>
              </div>
            </div> 
            <hr className="border-gray-600" />   
            <div className="flex">
                  <div className="flex-1">
                      <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">2 . Trending</p>
                      <h2 className="px-4 ml-2 w-48 font-bold text-white">#Ahmed Hafnaoui</h2>
                     
                      
                  </div>
                  <div className="flex-1 px-4 py-2 m-2">
                      <a href="" className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right">
                          <svg className="m-2 h-5 w-5" fill="none" width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
                      </a>
                  </div>
              </div>
              <hr className="border-gray-600"/>

            

              <hr className="border-gray-600"/>

            {/* show more */}
          </div>

          {/* third-people suggetion to follow section */}
          <div className="flow-root m-6 inline">
            <div className="flex-1">
              <a href="#">
                <p className="text-sm leading-6 font-medium text-gray-500">Terms Privacy Policy Cookies Imprint Ads info</p>
              </a>
            </div>
            <div className="flex-2">
              <p className="text-sm leading-6 font-medium text-gray-600">© 2023 Twitter, Inc.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
   
};

export default IndexPage;
