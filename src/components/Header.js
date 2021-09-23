import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signout, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const [session] = useSession();
  const router = useRouter();
  const products = useSelector(selectItems);
  return (
    <header>
      {/* top  */}
      <div className="flex items-center bg-amazon_blue flex-grow py-3">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* saerch bar  */}
        <div
          className=" hidden rounded-md
         flex-grow cursor-pointer
          sm:flex items-center h-10
            bg-yellow-400 hover:bg-yellow-500"
        >
          <input
            className=" px-4 focus:outline-none p-2 h-full w-6 flex-grow rounded-l-md flex-shrink"
            type="text"
          />
          <SearchIcon className="h-12 p-4 " />
        </div>
        {/* right section */}
        <div
          className="text-white flex items-center
         text-xs space-x-6 mx-6 whitespace-nowrap"
        >
          <div onClick={!session ? signIn : signout} className="link">
            <p>{session ? `Hello ${session.user.name}` : "Sign In"} </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center"
          >
            <span
              className="absolute top-0 right-0 
            md:right-10 h-4 w-4 bg-yellow-400 text-center
             rounded-full text-black font-bold"
            >
              {products.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* bottom  */}
      <div className="flex space-x-3 p-2 pl-6 items-center bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Busness</p>
        <p className="link">Today's Deals </p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personel Care</p>
      </div>
    </header>
  );
}

export default Header;
