import React from "react";
import Head from "next/head";
export default function PageNotFound ({}) {

  return (
    <div className="flex items-center justify-center h-screen">
      <Head>
        <title>404 - Not Found</title>
      </Head>
      <h1 className="text-2xl font-bold text-gray-700">Not Found</h1>
    </div>
  );
};

