// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import TaskCard from '../components/TaskCard';
// import TaskForm from '../components/TaskForm';
// import { fetchTasks } from '../store/slice/tasks/taskSlice';

// const Task = () => {
//   const dispatch = useDispatch();
//   const { tasks, isLoading, error } = useSelector((state) => state.tasks);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Create a Task</h2>
//       <TaskForm />

//       <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
//       {isLoading && <p>Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {tasks.map((task) => (
//           <TaskCard key={task._id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Task;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { fetchTasks } from '../store/slice/tasks/taskSlice';

const Task = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>
  
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
  
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!isLoading && tasks.length === 0 ? (
          <p className="text-gray-600 col-span-full text-center text-lg font-medium">
            No tasks found. Create your first task!
          </p>
        ) : (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        )}
      </div>
  
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative shadow-lg">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Create a Task</h2>
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Task;

