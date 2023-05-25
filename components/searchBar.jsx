import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("");
  const placeholders = [
    "Generate music",
    "Remove background from images",
    "Translate text",
    "Generate anime images",
    "Recognize objects in images",
    "Perform sentiment analysis",
    "Help me pick a laptop",
    "Face recognition",
    "Drawing canvas",
    "Create 3D objects from images",
    "Play a text-based game",
    "Predict stock prices",
    "Recommend movies",
    "Image classification",
    "Summarize text",
    "Generate video from text and audio",
    "Help me organize a trip",
  ];

  useEffect(() => {
    let typingInterval;
    if (placeholder.length < placeholders[placeholderIndex].length) {
      typingInterval = setInterval(() => {
        setPlaceholder(prevPlaceholder => prevPlaceholder + placeholders[placeholderIndex][placeholder.length]);
      }, 100); // The typing speed
    }
    return () => clearInterval(typingInterval);
  }, [placeholder, placeholderIndex]);

  useEffect(() => {
    const indexInterval = setInterval(() => {
      if (placeholder === placeholders[placeholderIndex]) {
        setPlaceholderIndex(Math.floor(Math.random() * placeholders.length));
        setPlaceholder(""); // reset the placeholder when the index changes
      }
    }, 1000);

    return () => clearInterval(indexInterval);
  }, [placeholder, placeholderIndex]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 rounded-md shadow-sm md:w-1/2 h-12">
      <input
        type="text"
        placeholder={placeholder}
        className="search-bar w-full h-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
