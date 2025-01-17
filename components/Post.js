import Link from "next/link";
import React from "react";

const Post = ({ post }) => {
  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <Link href={`posts/${post.id}`}>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:border-gray-600">
          {post.title}
        </span>
      </Link>
    </div>
  );
};

export default Post;
