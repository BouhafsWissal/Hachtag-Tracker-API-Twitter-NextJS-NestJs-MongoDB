import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { searchTweetsByHashtag } from './api/api';
import { HiOutlineTrash } from 'react-icons/hi';
import Link from 'next/link';

const Details = () => {
  const router = useRouter();
  const { hashtag } = router.query;
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (hashtag) {
      // Fonction pour récupérer les tweets pour le hashtag spécifié
      async function fetchTweetsForHashtag() {
        try {
          // Appel à la fonction searchTweetsByHashtag pour récupérer les tweets pour ce hashtag
          const tweets = await searchTweetsByHashtag(hashtag);
          setTweets(tweets);
        } catch (error) {
          console.error('Erreur lors de la récupération des tweets par hashtag :', error);
        }
      }

      // Appel à la fonction pour récupérer les tweets pour le hashtag spécifié
      fetchTweetsForHashtag();
    }
  }, [hashtag]);

  return (
    <>
      <Head>
        {/* ... */}
      </Head>
      <div className="font-sans bg-gray-100">
        {/* Affichage des tweets */}
        <div className="grid grid-cols-3 bg-slate-100 ml-8 mt-8 ">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="bg-blue-300 w-52 h-72 m-8 static rounded-lg">
              <div className="bg-white w-52 h-72 -m-2 hover:m-0 absolute rounded-lg shadow-lg hover:shadow-2xl transition-all duration-150 ease-out hover:ease-in">
                <div className="relative flex w-auto pl-4 flex-initial mt-2">
                  {/* ... Affichage du contenu du tweet ... */}
                </div>
                <hr className="m-4 rounded-2xl border-t-2" />
                <div className="m-4 text-sm">
                  {/* ... Affichage du reste du contenu du tweet ... */}
                </div>
              </div> 
            </div>
          ))}
        </div>
      </div>
      {/* Bouton de retour à la page OwnHashtags */}
      <div className="flex justify-center mt-6">
    
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Retour à la page Own Hashtags
          </a>
     
      </div>
    </>
  );
};

export default Details;
