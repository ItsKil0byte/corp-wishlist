import WishCard from "../../components/WishCard.jsx";
import WishlistEmpty from "./WishlistEmpty.jsx";

export default function Wishlist({ wishlist }) {
    if(!wishlist.wishes || wishlist.wishes.length === 0) {
        return <WishlistEmpty />
    }

    return (
        <>
            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 min-[700px]:grid-cols-3 gap-2 place-items-center">
                {
                    wishlist.wishes.map(wish => {
                        return (
                            <WishCard key={wish.id} name={wish.title} description={wish.description} />
                        )
                    })
                }
            </div>
            <pre>{JSON.stringify(wishlist)}</pre>
        </>
    )
}