import React from "react";
import CardSkeleton from "./CardSkeleton";

function CardListSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-4 xl:divide-x-2 xl:divide-y-0">
      <div className="col-span-2 divide-y-2">
        <div className="p-4 shadow-xl">
          <h1>Top Tags</h1>
          {/* Skeleton Loading for Tags */}
          <ul>
            <li class="bg-gray-300 animate-pulse w-16 h-6 rounded-full mb-2"></li>
            <li class="bg-gray-300 animate-pulse w-20 h-6 rounded-full mb-2"></li>
            <li class="bg-gray-300 animate-pulse w-12 h-6 rounded-full mb-2"></li>
            <li class="bg-gray-300 animate-pulse w-24 h-6 rounded-full mb-2"></li>
            <li class="bg-gray-300 animate-pulse w-16 h-6 rounded-full mb-2"></li>
          </ul>
        </div>
      </div>

      <div className="col-span-8">
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
      </div>

      <div className="col-span-2">
        <div class="clock">
          <div class="bg-gray-300 animate-pulse w-16 h-6 rounded-full mb-2"></div>
          <div class="bg-gray-300 animate-pulse w-16 h-6 rounded-full mb-2"></div>
        </div>
      </div>
    </div>
  );
}

export default CardListSkeleton;
