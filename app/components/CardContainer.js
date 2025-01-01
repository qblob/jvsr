"use client"

import React, { useState, useEffect } from 'react';
import Card from './Card';

const CardContainer = ({ cards }) => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    if (cards && Array.isArray(cards)) {
      setVisibleCards(cards.slice(0, 3));
    }
  }, [cards]);

  return (
    <div className="grid grid-cols-3 gap-4 transition-transform duration-500 ease-in-out transform">
      {visibleCards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          text={card.text}
          date={card.date}
        />
      ))}
    </div>
  );
};

export default CardContainer;
