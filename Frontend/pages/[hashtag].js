import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { searchTweetsByHashtag } from './api/api';
import Side from './side';
const HashtagDetails = () => {
  const router = useRouter();
  const { hashtag } = router.query;
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (hashtag) {
      // Fonction pour récupérer les tweets pour le hashtag
      async function fetchTweetsForHashtag() {
        try {
          const tweets = await searchTweetsByHashtag(hashtag);
          setTweets(tweets);
        } catch (error) {
          console.error('Erreur lors de la récupération des tweets pour le hashtag :', error);
        }
      }

      // Appel à la fonction pour récupérer les tweets pour le hashtag
      fetchTweetsForHashtag();
    }
  }, [hashtag]);

  return (
        <div className="bg-blue-950">
      
        <div className="flex">
          <div className="w-2/5 text-white  pl-32  ">
      <Side/>
          </div>
  
          <div className="w-2/5 border border-gray-600 h-auto border-t-0">
    {/* middle wall */}
    <hr className="border-gray-600" />
    <hr className="border-blue-800 border-4" />  
    <br/> 
   
  
    {tweets.map((tweet) => (
      <><div key={tweet._id} className="p-4 mr-6"> 

        <a className="flex-shrink-0 group block">
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
        <hr className="border-gray-600" /> 
        <hr className="border-gray-600" /> </>
    ))} 
  </div>
 
  </div> 
   
         
        </div>
 
  );
};

export default HashtagDetails;
