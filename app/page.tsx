"use client"

import * as React from "react"
import Hero from "./_components/Hero";
import PopularCityList from "./_components/PopularCityList";

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularCityList />
    </div>
  );
}