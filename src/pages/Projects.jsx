import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  createProject,
  updateProject,
} from '../store/slice/projects/projectSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading, error } = useSelector((state) => state.projects);

  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const openCreateModal = () => {
    setSelectedProject(null);
    setProjectName('');
    setShowModal(true);
  };

  const openUpdateModal = (project) => {
    setSelectedProject(project);
    setProjectName(project.name);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!projectName.trim()) {
      return toast.error('Project name cannot be empty');
    }

    try {
      if (selectedProject) {
        await dispatch(updateProject({ ...selectedProject, name: projectName })).unwrap();
        toast.success('Project updated successfully');
      } else {
        await dispatch(createProject({ name: projectName })).unwrap();
        toast.success('Project created successfully');
      }

      setProjectName('');
      setSelectedProject(null);
      setShowModal(false);
      dispatch(fetchProjects());
    } catch (err) {
      toast.error(err || 'Something went wrong');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
          <p className="text-gray-600">Manage all your projects in one place</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          + New Project
        </button>
      </div>

      {isLoading && <div className="text-gray-500">Loading projects...</div>}
      

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No projects available.</p>
          <p className="text-sm">Click “New Project” to create your first one.</p>
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <li
              key={project._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border border-gray-200 group"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                <button
                  onClick={() => openUpdateModal(project)}
                  className="text-sm text-blue-500 hover:underline opacity-0 group-hover:opacity-100 transition"
                >
                  Edit
                </button>
              </div>
              <Link
                to={`/projects/${project._id}/tasks`}
                className="text-blue-600 hover:underline text-sm font-medium mt-2 inline-block"
              >
                View Tasks →
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md transform transition-all scale-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {selectedProject ? 'Update Project' : 'Create New Project'}
            </h3>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedProject(null);
                  setProjectName('');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {selectedProject ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

