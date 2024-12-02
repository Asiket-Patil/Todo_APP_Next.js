"use client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import axios from 'axios';

export default function Home() {

  const [todoData, setTodoData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchTodo = async () => {
    try {
      const response = await axios('/api');
      setTodoData(response.data.todos);
    } catch (error) {
      toast.error("Failed to fetch todos");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete('/api', {
        params: {
          mongoId: id
        }
      });
      toast.success(response.data.msg);
      fetchTodo();
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await axios.put('/api', {}, {
        params: {
          mongoId: id
        }
      });
      toast.success(response.data.msg);
      fetchTodo();
    } catch (error) {
      toast.error("Failed to update todo status");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((form) => ({ ...form, [name]: value }));
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api', formData);
      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: ""
      });
      fetchTodo();
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      <ToastContainer theme="dark" position="top-center" />
      <form onSubmit={onsubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 mx-auto">
        <input value={formData.title} onChange={onChangeHandler} type="text" name="title" placeholder="Enter the Todo" className="px-3 py-2 border-2 w-full" />
        <textarea value={formData.description} onChange={onChangeHandler} name="description" placeholder="Enter Description" className="px-3 py-2 border-2 w-full"></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">Add Todo</button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto bg-white">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-300 text-black">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              todoData.map((todo,index) => (
                <Todo key={todo._id}
                  id={index}
                  title={todo.title}
                  description={todo.description}
                  complete={todo.isCompleted}
                  mongoId={todo._id}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
