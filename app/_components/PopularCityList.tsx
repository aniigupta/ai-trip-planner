"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full py-20 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 font-sans mb-12">
          🌍 Popular Destinations to Visit
        </h2>
        <Carousel items={cards} />
      </div>
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(2).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-white dark:bg-neutral-800 p-6 md:p-10 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="flex-1">
              <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg font-sans leading-relaxed">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  The first rule of Apple club is that you boast about Apple
                  club.
                </span>{" "}
                Keep a journal, jot down lists, and capture every thought
                effortlessly. Seamless, simple, and stylish.
              </p>
            </div>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="400"
              width="400"
              className="md:w-1/3 w-full object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights – Eiffel Tower, Louvre & more",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "New York, USA",
    title: "Experience NYC – Times Square, Central Park, Broadway",
    src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Rome, Italy",
    title: "Walk through History – Colosseum, Vatican, Roman Forum",
    src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Dubai, UAE",
    title: "Luxury and Innovation – Burj Khalifa, Desert Safari",
    src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "India",
    title: "Heritage & Wonders – Taj Mahal, Jaipur, Kerala Backwaters",
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop",
    content: <DummyContent />,
  },
];
