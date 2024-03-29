import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* header  */}
      <Header />
      <main className="max-w-screen-xl mx-auto bg-gray-100">
        {/* Banner */}
        <Banner />
        {/* Product Items */}
        <ProductFeed products={products} />
      </main>
      {/* ---- ---- */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: { products, session },
  };
}
