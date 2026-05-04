import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/navigation/Header.jsx";

function ViewWish() {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const wishlist = JSON.parse(sessionStorage.getItem("wishlists")).find(
    (wishlist) => wishlist.id === Number(searchParams.get("from")),
  );
  const wish = wishlist.wishes.find(
    (wish) => wish.id === Number(searchParams.get("id")),
  );
  const color = `bg-${wish.color}`;

  console.log(wish);

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        hasBackButton={true}
        hasEditButton={true}
        onBack={() => {
          navigate(
            `/wishlists/wishlist/view?id=${Number(searchParams.get("from"))}`,
          );
        }}
        onEdit={() => {
          navigate(
            `/wishlists/wish/edit?id=${Number(searchParams.get("id"))}&from=${Number(searchParams.get("from"))}`,
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
}

export default ViewWish;
