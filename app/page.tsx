"use client";

import { useState } from "react";
import IntoleranceSelector from "../components/IntoleranceSelector";
import ProductList from "../components/ProductList";

export default function Home() {
  const [intolerance, setIntolerance] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleShowRecommendations = () => {
    setShowRecommendations(true);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Food Intolerance Recommendation System
      </h1>
      <IntoleranceSelector
        selectedIntolerance={intolerance}
        onSelectIntolerance={setIntolerance}
      />
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleShowRecommendations}
        disabled={!intolerance}
      >
        Show Recommendations
      </button>
      {showRecommendations && intolerance && (
        <ProductList intolerance={intolerance} />
      )}
    </main>
  );
}
