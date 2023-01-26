import React from "react";
import { useRouter } from "next/router";

export default function Product({}) {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-gray-700">Product: {postId}</h1>
    </div>
  );
}
