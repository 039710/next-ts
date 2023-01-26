import React from "react";
import Head from "next/head";
import {useRouter} from "next/router";
export default function ProductReview({}) {
  const router = useRouter();
  const { postId } = router.query;
  return (
    <div className="flex items-center justify-center h-screen">
      <Head>
        <title>Product Review</title>
      </Head>
      <h1 className="text-2xl font-bold text-gray-700">
        Product Review: {postId}
      </h1>
    </div>
  );
}
