import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/navigation/Header.jsx";

const ViewSharedWish = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const wishId = searchParams.get("id");

  const wishlist = JSON.parse(sessionStorage.getItem("shared_wishlist"));
  const wish = wishlist.wishes.find((wish) => wish.id === Number(wishId));
  const color = `bg-${wish.color}`;

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        hasBackButton={true}
        hasText={true}
        onBack={() => {
          navigate(`/shared-wishlist`);
        }}
        text={
          wishlist.icon ? `${wishlist.icon} ${wishlist.title}` : wishlist.title
        }
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

export default ViewSharedWish;
