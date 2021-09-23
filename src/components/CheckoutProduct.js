import { StarIcon } from "@heroicons/react/outline";
import Image from "next/dist/client/image";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
function CheckoutProduct({
  id,
  title,
  rating,
  price,
  descritpion,
  category,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      descritpion,
      category,
      image,
      hasPrime,
      rating,
    };
    dispatch(addToBasket(product));
  };
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      {/* left  */}
      <Image src={image} height={200} width={200} objectFit="contain" />
      {/* middle */}
      <div className="col-span-3mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xm mt-2 mb-2 line-clamp-3 text-black">
          {descritpion}
        </p>

        <p>{`${price} USD`}</p>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              className="w-12"
              loading="lazy"
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* right */}

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
