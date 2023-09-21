import React from 'react'; // Assuming you're using React
import Data from './Data'; // Import your data

const Card = ({ item }) => {
  return (
    <div className="max-w-4xl  rounded overflow-hidden shadow-2xl mx-2 my-2 shadow-slate-500 border drop-shadow-2xl border-gray-300 p-2 dark:bg-gray-850 dark:border-gray-900 dark:shadow-2xl dark:shadow-slate-700">
      <img className="w-full h-96 object-cover" src={item.img} alt={item.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 dark:text-white">{item.title}</div>
        <p className="text-gray-700 text-base dark:text-slate-400">{item.desc}</p>
      </div>
              <div class="flex justify-between items-center mb-5 text-gray-500">
                  <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                      {item.category}
                  </span>
                  <span class="text-sm">14 days ago</span>
              </div>
    </div>
  );
};

export default Card;
