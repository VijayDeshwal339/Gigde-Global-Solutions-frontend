import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksByProject } from '../store/slice/tasks/taskSlice';
import { Link, useParams } from 'react-router-dom';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  inProgress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const ProjectTasks = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);

  const Project = projects.find(
    (project) => project._id === projectId
  );

  console.log(Project)

  useEffect(() => {
    if (projectId) {
      dispatch(fetchTasksByProject(projectId));
    }
  }, [dispatch, projectId]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Tasks for Project <span className="text-blue-600">{Project.name}</span>
      </h2>

      {isLoading && <p className="text-gray-500 text-lg">Loading tasks...</p>}
      {error && <p className="text-red-600 text-lg">Error: {error}</p>}

      {!isLoading && !error && tasks.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No tasks found for this project.</p>
          <Link to="/"><p className="text-sm">Add tasks to get started here</p></Link>
        </div>
      )}

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{task.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{task.description || 'No description'}</p>
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                statusColors[task.status] || 'bg-gray-200 text-gray-700'
              }`}
            >
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTasks;
