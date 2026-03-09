import React, {useEffect, useState} from 'react';

const EmojiPicker = ({ title, emojiSet, initialEmoji = null, onEmojiPicked }) => {
    const [pickedEmoji, setPickedEmoji] = useState(emojiSet.includes(initialEmoji) ? initialEmoji : null)

    useEffect(() => {
        onEmojiPicked(pickedEmoji)
    }, [onEmojiPicked, pickedEmoji])

    return (
        <div className={`w-full h-fit grid grid-rows-3 grid-cols-3 min-[360px]:grid-rows-2 min-[360px]:grid-cols-4
                        min-[515px]:grid-cols-8 min-[515px]:grid-rows-1 border-2 border-main-theme rounded-[0.875rem] gap-x-3 p-4
                        justify-self-start relative`}
        >
            <div className="flex justify-center items-center bg-white px-1 text-main-theme text-[0.9375rem]
                            top-[-0.75rem] left-[1rem] absolute"
            >
                {title}
            </div>
            <div className={`w-12 h-12 flex justify-center items-center text-[2rem] 
                            ${!pickedEmoji && "border-2 border-main-theme rounded-[0.875rem]"}`}
                 onClick={() => setPickedEmoji(null)}
            >
                {"🚫"}
            </div>
            {
                emojiSet && emojiSet.map((emoji, index) => {
                    return (
                        <div key={index}
                             className={`w-12 h-12 flex justify-center items-center text-[2rem] 
                                        ${pickedEmoji === emoji && "border-2 border-main-theme rounded-[0.875rem]"}`}
                             onClick={() => setPickedEmoji(emoji)}
                        >
                            {emoji}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default EmojiPicker;