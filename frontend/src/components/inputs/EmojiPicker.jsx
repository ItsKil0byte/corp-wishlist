import React, { useEffect, useState } from "react";

const EmojiPicker = ({
  title,
  emojiSet,
  initialEmoji = null,
  onEmojiPicked,
}) => {
  const [pickedEmoji, setPickedEmoji] = useState(
    emojiSet.includes(initialEmoji) ? initialEmoji : null,
  );

  useEffect(() => {
    onEmojiPicked(pickedEmoji);
  }, [onEmojiPicked, pickedEmoji]);

  return (
    <div
      className={`border-main-theme relative grid h-fit w-full grid-cols-3 grid-rows-3 gap-x-3 justify-self-start rounded-[0.875rem] border-2 p-4 min-[360px]:grid-cols-4 min-[360px]:grid-rows-2 min-[515px]:grid-cols-8 min-[515px]:grid-rows-1`}
    >
      <div className="text-main-theme absolute top-[-0.75rem] left-[1rem] flex items-center justify-center bg-white px-1 text-[0.9375rem]">
        {title}
      </div>
      <div
        className={`flex h-12 w-12 items-center justify-center text-[2rem] ${!pickedEmoji && "border-main-theme rounded-[0.875rem] border-2"}`}
        onClick={() => setPickedEmoji(null)}
      >
        {"🚫"}
      </div>
      {emojiSet &&
        emojiSet.map((emoji, index) => {
          return (
            <div
              key={index}
              className={`flex h-12 w-12 items-center justify-center text-[2rem] ${pickedEmoji === emoji && "border-main-theme rounded-[0.875rem] border-2"}`}
              onClick={() => setPickedEmoji(emoji)}
            >
              {emoji}
            </div>
          );
        })}
    </div>
  );
};

export default EmojiPicker;
