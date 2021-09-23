import { StarIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;
function Product({ id, title, price, descritpion, category, image }) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) * MIN_RATING
  );
  const dispatch = useDispatch();

  const [hasPrime] = useState(Math.random() < 0.5);

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
  return (
    console.log("htthth ", image),
    (
      <div className="relative flex flex-col m-5 bg-white z-30 p-10">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400">
          {category}
        </p>
        <Image height={200} width={200} src={image} objectFit="contain" />
        <h4 className="my-3 ">{title}</h4>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-2">{descritpion}</p>
        <div className="mb-5">
          <p>{`${price} USD`}</p>
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-5">
            <img
              src="https://links.papareact.com/fdw"
              alt=""
              className="w-12"
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
        <button onClick={addItemToBasket} className="mt-auto button">
          Add to Basket
        </button>
      </div>
    )
  );
}

export default Product;
