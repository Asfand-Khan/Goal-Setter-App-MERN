import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalServices from "./goalsServices";

const initialState = {
  goals: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createGoal = createAsyncThunk(
  "goal/create",
  async (goal, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalServices.create(goal, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGoals = createAsyncThunk("goals/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalServices.get(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);
      return await goalServices.deleteGoal(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.goals = [];
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.goals = [];
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
