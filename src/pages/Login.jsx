import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/auth/authSlice';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success('Login successful');
      navigate('/projects');
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        
        <div>
          <input
            {...register('email')}
            placeholder="Email"
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <input
            {...register('password')}
            placeholder="Password"
            type="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
