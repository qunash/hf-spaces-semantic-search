import React from 'react';

interface CardProps {
  username: string;
  title: string;
  description: string;
  emoji: string;
  colorFrom: string;
  colorTo: string;
  updateDate: string;
  numLikes: number;
}

const Card: React.FC<CardProps> = ({
  username,
  title,
  description,
  emoji,
  colorFrom,
  colorTo,
  updateDate,
  numLikes,
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-${colorFrom}-500 to-${colorTo}-500 rounded-lg p-6 flex flex-col justify-between h-72`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{emoji}{username}/{title}</h2>
        <div className="flex items-center">
          <span>{numLikes}🤍</span>
        </div>
      </div>
      <div className="flex items-center h-full">
        <p className="text-2xl">{description}</p>
      </div>
    </div>
  );
};

export default Card;