import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/navigation/Header.jsx";

const ViewOthersWish = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const wishId = searchParams.get("id");
  const wishlistId = searchParams.get("from");
  const groupId = searchParams.get("groupId");
  const userId = searchParams.get("user");

  const wishlist = JSON.parse(sessionStorage.getItem("others_wishlists")).find(
    (wishlist) => wishlist.id === Number(searchParams.get("from")),
  );
  const wish = wishlist.wishes.find((wish) => wish.id === Number(wishId));
  const color = `bg-${wish.color}`;

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        hasBackButton={true}
        onBack={() => {
          navigate(
            `/wishlists/wishlist/view/others?id=${wishlistId}&from=${groupId}&user=${userId}`,
          );
        }}
      />
      <div
        className={`mx-4 p-4 ${color} flex flex-col justify-center rounded-2xl`}
      >
        <span className="w-full text-center text-2xl font-semibold wrap-break-word">
          {wish.title}
        </span>
        <div className="text-main-theme-primary w-full p-4 text-center font-semibold wrap-break-word">
          {wish.description}
        </div>
      </div>
    </div>
  );
};

export default ViewOthersWish;
