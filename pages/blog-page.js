import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getAllPostsData } from "@/lib/posts";
import Link from "next/link";
import React from "react";

const BlogPage = ({ filteredPosts }) => {
  return (
    <Layout title="BlogPage">
      <ul>
        {filteredPosts &&
          filteredPosts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
      <Link href="main-page">
        <div className="flex sursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            data-slot="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default BlogPage;

export const getStaticProps = async () => {
  const filteredPosts = await getAllPostsData();
  return { props: { filteredPosts }, revalidate: 3 };
};
