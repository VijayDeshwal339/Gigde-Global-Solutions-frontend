import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../store/slice/tasks/taskSlice';
import { fetchProjects } from '../store/slice/projects/projectSlice';
import toast from 'react-hot-toast';

const TaskForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.project) {
      setError('Title and Project are required');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await dispatch(
        createTask({
          ...formData,
          projectId: formData.project,
        })
      ).unwrap();
      toast.success('Task added successfully');
      setFormData({ title: '', description: '', project: '' });
      if (onClose) onClose(); // close modal
    } catch (err) {
      console.error(err);
      toast.error('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1 font-semibold text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="p-3 border outline-none border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="project" className="mb-1 font-semibold text-gray-700">
          Select Project
        </label>
        <select
          id="project"
          name="project"
          value={formData.project}
          onChange={handleChange}
          className="p-3 border outline-none border-gray-300 rounded-md"
          required
        >
          <option value="">-- Select Project --</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:col-span-3">
        <label
          htmlFor="description"
          className="mb-1 font-semibold text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="p-3 border outline-none border-gray-300 rounded-md"
          rows={4}
        />
      </div>

      {error && (
        <p className="text-red-500 text-center text-sm md:col-span-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`md:col-span-3 w-full py-2 px-4 rounded-md ${
          loading
            ? 'bg-gray-400'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? 'Adding Task...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
