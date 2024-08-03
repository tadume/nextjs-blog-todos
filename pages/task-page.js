import Layout from "@/components/Layout";
import Task from "@/components/Task";
import TaskForm from "@/components/TaskForm";
import { StateContext, StaticContextProvider } from "@/context/StateContext";
import { getAllTasksData } from "@/lib/tasks";
import Link from "next/link";
import React, { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage = ({ staticFilteredTasks }) => {
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticFilteredTasks,
  });
  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  useEffect(() => mutate, []);

  return (
    <StaticContextProvider>
      <Layout title="TaskPage">
        <TaskForm taskCreated={mutate} />
        <ul>
          {filteredTasks &&
            filteredTasks.map((task) => (
              <Task key={task.id} task={task} taskDeleted={mutate} />
            ))}
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
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </StaticContextProvider>
  );
};

export default TaskPage;

export const getStaticProps = async () => {
  const staticFilteredTasks = await getAllTasksData();
  return { props: { staticFilteredTasks }, revalidate: 3 };
};
