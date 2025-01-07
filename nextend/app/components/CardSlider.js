"use client"

import React, { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

const CardSlider = ({ fetchUrl }) => {
  const [data, setData] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchUrl);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [fetchUrl]);

  const handleNext = () => {
    setVisibleIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrevious = () => {
    setVisibleIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <div className='mt-16'>
      <div className="w-full gap-4 p-4">
        <CardContainer cards={[...data.slice(visibleIndex, visibleIndex + 3), ...data.slice(0, Math.max(0, (visibleIndex + 3) - data.length))]} />
      </div>
      <div className='w-fit mx-auto flex space-x-4'>
        <button onClick={handlePrevious} className="p-2 dark:bg-black border dark:text-white rounded-full">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <button onClick={handleNext} className="p-2 dark:bg-black border dark:text-white rounded-full">
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default CardSlider;
