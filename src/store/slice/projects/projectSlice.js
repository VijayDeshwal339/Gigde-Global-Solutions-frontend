// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import ProjectService from './ProjectService';

// export const fetchProjects = createAsyncThunk('projects/fetch', ProjectService.fetchProjects);
// export const createProject = createAsyncThunk('projects/create', ProjectService.createProject);
// export const getProjectById = createAsyncThunk('projects/getById',ProjectService.getProjectById);
// export const updateProject = createAsyncThunk('projects/update', ProjectService.updateProject);


// const projectSlice = createSlice({
//   name: 'projects',
//   initialState: {
//     projects: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProjects.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchProjects.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.projects = action.payload;
//       })
//       .addCase(fetchProjects.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(createProject.fulfilled, (state, action) => {
//         state.projects.push(action.payload);
//       }) 
//       .addCase(updateProject.fulfilled, (state, action) => {
//         const index = state.projects.findIndex((project) => project._id === action.payload._id);
//         if (index !== -1) {
//           state.projects[index] = action.payload; // Update the project in state
//         }
//       })
//       .addCase(getProjectById.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getProjectById.fulfilled, (state, action) => {
//         state.isLoading = false;
//       })
//       .addCase(getProjectById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });      
//   },
// });

// export default projectSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectService from './ProjectService';

export const fetchProjects = createAsyncThunk('projects/fetch', ProjectService.fetchProjects);
export const createProject = createAsyncThunk('projects/create', ProjectService.createProject);
export const updateProject = createAsyncThunk('projects/update', ProjectService.updateProject); // New action

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      });
  },
});

export default projectSlice.reducer;
