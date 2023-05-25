import React from 'react';

const tailwindColors = {
  red: '#dc2626',
  yellow: '#d97706',
  green: '#16a34a',
  blue: '#2563eb',
  indigo: '#4f46e5',
  purple: '#7c3aed',
  pink: '#db2777',
  gray: '#4b5563',
};

const Card = ({
  space_id,
  author,
  title,
  description,
  emoji,
  lastModified,
  colorFrom,
  colorTo,
  likes,
  sdk,
  runtimeStage,
  currentHardware,
}) => {
  const gradientStyle = {
    background: `linear-gradient(to bottom right, ${tailwindColors[colorFrom]}, ${tailwindColors[colorTo]})`,
  };

  const spaceUrl = `https://huggingface.co/spaces/${space_id}`;

  let runtimeStageIcon = null;
  if (runtimeStage === 'STOPPED') {
    runtimeStageIcon = <svg className="mr-0.5" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1.1em" height="1.1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
      <rect x="11" y="9" width="2" height="14" fill="currentColor" />
      <rect x="19" y="9" width="2" height="14" fill="currentColor" />
    </svg>;
  } else if (runtimeStage.includes('ERROR')) {
    runtimeStageIcon = <svg className="mr-0.5" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1.1em" height="1.1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>;
  }

  return (
    <div className="flex flex-col">
      <a href={spaceUrl} target="_blank" rel="noopener noreferrer">
        <div className="text-sm truncate px-2 py-1 w-full font-bold text-clip">
          {emoji} {title}
        </div>
      </a>

      <a href={spaceUrl} target="_blank" rel="noopener noreferrer">
        <div
          className={`relative z-0 mx-auto flex flex-col items-center justify-center p-4 filter hover:brightness-110 overflow-hidden h-52 rounded-lg`}
          style={gradientStyle}
        >
          <div className="flex justify-between items-center w-full">
            <div className="right-16 flex flex-wrap content-start gap-1.5 overflow-hidden top-3 left-3 text-xs">
              <div className={`inline-flex select-none items-center overflow-hidden font-mono rounded bg-white/10 px-1 py-0 leading-tight text-white opacity-80`}>
                {runtimeStageIcon}
                <strong>{runtimeStage}</strong>
                {runtimeStage === "RUNNING" && (
                  <>
                    <span className="mx-1">on</span>
                    <strong>{currentHardware}</strong>
                  </>
                )}
              </div>
              <div className="inline-flex select-none items-center overflow-hidden font-mono  rounded bg-white/10 px-1 py-0 leading-tight text-white opacity-80">
                <span>{lastModified}</span>
              </div>
            </div>
            <div className="flex items-center">
              <svg className="mr-1.5 text-white" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" fill="currentColor">
                <path d="M22.45,6a5.47,5.47,0,0,1,3.91,1.64,5.7,5.7,0,0,1,0,8L16,26.13,5.64,15.64a5.7,5.7,0,0,1,0-8,5.48,5.48,0,0,1,7.82,0L16,10.24l2.53-2.58A5.44,5.44,0,0,1,22.45,6m0-2a7.47,7.47,0,0,0-5.34,2.24L16,7.36,14.89,6.24a7.49,7.49,0,0,0-10.68,0,7.72,7.72,0,0,0,0,10.82L16,29,27.79,17.06a7.72,7.72,0,0,0,0-10.82A7.49,7.49,0,0,0,22.45,4Z"></path>
              </svg>
              <span className="text-white text-sm">{likes}</span>
            </div>
          </div>
          <div className="flex items-center h-full">
            <p className="text-white text-base text-center font-semibold text-ellipsis overflow-hidden">
              {description}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
