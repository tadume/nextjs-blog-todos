import React from "react";
import Head from "next/head";

const Layout = ({ children, title = "Dafault Title" }) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-1 justify-center items-center w-screen flex-col">
        {children}
      </main>
      <footer>daiblog 2024</footer>
    </div>
  );
};

export default Layout;
