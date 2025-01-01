"use client"

import React, { useEffect, useState } from 'react';

import CardSlider from './components/CardSlider';

export default function Page() {
  return (
    <div>
      <div className="w-full gap-4 p-4">
        <CardSlider fetchUrl='/api/retrieveLimitedDocuments?limit=5' />
      </div>
    </div>
  );
}
