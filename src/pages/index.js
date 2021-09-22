import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* header  */}
      <Header />
      <main className="max-w-screen-xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Product Items */}
      </main>
      {/* ---- ---- */}
    </div>
  );
}
