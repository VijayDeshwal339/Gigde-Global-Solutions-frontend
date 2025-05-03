import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth/authSlice';
import taskReducer from './slice/tasks/taskSlice';
import projectReducer from './slice/projects/projectSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    projects: projectReducer, 
  },
});
