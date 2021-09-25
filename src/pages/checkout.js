import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
console.log(
  "this is strapi key ",
  process.env.stripe_public_key,
  `${process.env.STRIPE_PUBLIC_KEY}`
);
const stripPromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_STRIPE_KEY);
function Checkout() {
  const products = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();
  console.log("this is session ", session);
  const createCheckoutSession = async () => {
    const stripe = await stripPromise;
    // call the backend to create strip checkout
    const checkoutSession = await axios.post(
      "/api/create-checkout-session",

      {
        items: products,
        email: session.user.email,
      }
    );
    //Redirect custom to strip checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            height={250}
            width={1020}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {products.length === 0
                ? "Your Amazon Basket is empty."
                : "Your Shopping Basket"}
            </h1>

            {products.map((item, index) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col bg-white p-10  shadow-md">
          {products.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({products.length} items):
                <span className="font-bold ml-2">{`${total} USD`}</span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
