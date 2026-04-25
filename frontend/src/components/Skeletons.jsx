import React from 'react';

export const ProductSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full animate-pulse relative overflow-hidden">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
            
            <div className="w-full pt-[100%] bg-gray-100 dark:bg-gray-700 rounded-[2rem] mb-6"></div>
            <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full w-full mb-2"></div>
            <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full w-2/3 mb-6"></div>
            <div className="mt-auto flex justify-between items-center">
                <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-full w-1/3"></div>
                <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-2xl"></div>
            </div>
        </div>
    );
};
