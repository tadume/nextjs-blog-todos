import { StateContext } from "@/context/StateContext";
import React, { useContext } from "react";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const TaskForm = ({ taskCreated }) => {
  const { selectedTask, setSelectedTask } = useContext(StateContext);

  const create = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
      method: "POST",
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT is not valid");
      }
    });
    setSelectedTask({ id: 0, title: "" });
    taskCreated();
  };

  const update = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("JWT is not valid");
      }
    });
    setSelectedTask({ id: 0, title: "" });
    taskCreated();
  };

  return (
    <div>
      <form onSubmit={selectedTask.id === 0 ? create : update}>
        <input
          className="text-black mb-8 px-2 py-1"
          type="text"
          value={selectedTask.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        >
          {selectedTask.id === 0 ? "create" : "update"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
