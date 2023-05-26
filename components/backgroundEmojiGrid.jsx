import { useEffect, useState } from 'react';

const emojis = ['😄', '🚀', '👀', '👨‍💻', '👩‍💻', '🎉', '🔥', '🎊', '🙌', '👏', '🎁', '🤩', '🥳', '🔗', '🌟', '🌈', '🌞', '🌝', '🌚', '👋', '🍕', '🍔', '🍟', '🍳', '🍲', '🍱', '🍣', '🍤', '🍦', '🍩', '🍪', '🎂', '🍰', '🍫', '🍬', '🍭', '🍿', '🍷', '🍸', '🍹', '🍺', '🍻', '🍽', '🥢', '🧂', '⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳️', '🏹', '🎣', '🥊', '🥋', '🎽', '🛹', '🛷', '🥌', '🎿', '⛷', '🏂', '🏋️‍♀️', '🤼‍♀️', '🤸‍♀️', '⛹️‍♀️', '🤺', '🤾‍♀️', '🏌️‍♀️', '🏇', '🧘‍♀️', '🏄‍♀️', '🏊‍♀️', '🤽‍♀️', '🚣‍♀️', '🧗‍♀️', '🚵‍♀️', '🚴‍♀️', '🏆', '💻']

export default function BackgroundEmojiGrid() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const newGrid = Array.from({ length: 1000 }, () => emojis[Math.floor(Math.random() * emojis.length)]); // Adjust the length to suit the size of your grid
    setGrid(newGrid);
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 w-[200vh] h-[200vh] overflow-hidden -z-10 transform -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-10">
      {grid.map((emoji, i) => (
        <span key={i} className="inline-block w-24 h-24 md:w-32 md:h-32 text-4xl">{emoji}</span> // Adjust the width and height to suit the size of your grid cells
      ))}
    </div>
  );
}
