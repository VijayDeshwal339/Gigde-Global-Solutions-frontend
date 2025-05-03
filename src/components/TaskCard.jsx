import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../store/slice/tasks/taskSlice';
import { fetchProjects } from '../store/slice/projects/projectSlice';
import { toast } from 'react-hot-toast';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  const [isEditing, setIsEditing] = useState(false);

  const [editedTask, setEditedTask] = useState({
    ...task,
    projectId: typeof task.projectId === 'object' ? task.projectId._id : task.projectId,
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    setEditedTask((prev) => ({
      ...prev,
      projectId: typeof task.projectId === 'object' ? task.projectId._id : task.projectId,
    }));
  }, [task.projectId]);

  const handleComplete = () => {
    dispatch(updateTask({ id: task._id, taskData: { status: 'Completed' } }));
    toast.success('Task marked as completed');
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    toast.success('Task deleted');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const { title, description, projectId } = editedTask;

    if (!title.trim() || !description.trim() || !projectId) {
      toast.error('All fields are required');
      return;
    }

    const trimmedTask = {
      title: title.trim(),
      description: description.trim(),
      projectId,
    };

    dispatch(updateTask({ id: task._id, taskData: trimmedTask }));
    toast.success('Task updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({
      ...task,
      projectId: typeof task.projectId === 'object' ? task.projectId._id : task.projectId,
    });
    setIsEditing(false);
  };

  const currentProject = projects.find(
    (project) => project._id === editedTask.projectId
  );

  const currentProjectName = currentProject ? currentProject.name : 'Unknown';

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex justify-between items-start">
        <div className="w-full">
          {!isEditing ? (
            <>
              <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <p className="text-xs text-gray-500">
                Project: <span className="font-medium text-blue-600">{currentProjectName}</span> | Status:{' '}
                <span
                  className={`font-medium ml-1 ${
                    task.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {task.status}
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Created: {new Date(task.createdAt).toLocaleString()}
                {task.status === 'Completed' && task.completedAt && (
                  <>
                    <br />
                    Completed: {new Date(task.completedAt).toLocaleString()}
                  </>
                )}
              </p>
            </>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleEditChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Title"
              />
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleEditChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
              />
              {projects.length > 0 ? (
                <select
                  name="projectId"
                  value={editedTask.projectId}
                  onChange={handleEditChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a project</option>
                  {projects.map((proj) => (
                    <option key={proj._id} value={proj._id}>
                      {proj.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-gray-400">Loading projects...</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-6 justify-start flex-wrap">
        {!isEditing && task.status !== 'Completed' && (
          <button
            onClick={handleComplete}
            className="bg-green-600 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:bg-green-700"
          >
            Mark Completed
          </button>
        )}

        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-600 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:bg-yellow-700"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
