import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TaskService from './TaskService';

export const fetchTasks = createAsyncThunk('tasks/fetch', TaskService.fetchTasks);
export const createTask = createAsyncThunk('tasks/create', TaskService.createTask);
export const updateTask = createAsyncThunk('tasks/update', TaskService.updateTask);
export const deleteTask = createAsyncThunk('tasks/delete', TaskService.deleteTask);
export const fetchTasksByProject = createAsyncThunk('tasks/fetchByProject',TaskService.fetchTasksByProject);


const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // createTask
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      })

      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.meta.arg);
      })
      .addCase(fetchTasksByProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });      
  },
});

export default taskSlice.reducer;
