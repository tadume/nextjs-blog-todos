import Layout from "@/components/Layout";
import { getAllPostsIds, getPostData } from "@/lib/posts";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Post = ({ post }) => {
  const router = useRouter();
  if (router.isFallback || !post) {
    return <Layout title="DetailPost">Loading...</Layout>;
  }
  return (
    <Layout title="DetailPost">
      <p className="m-4">
        {"ID : "}
        {post.id}
      </p>
      <p className="mb-4 text-xl font-bold">{post.title}</p>
      <p className="mb-12">{post.created_at}</p>
      <p className="px-10">{post.content}</p>
      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const paths = await getAllPostsIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getPostData(params.id);

  return { props: { post }, revalidate: 3 };
};
