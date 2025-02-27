import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "../Appwrite/Config";

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
    const allpost = await service.getPosts();
    return allpost;
});

const postSlice = createSlice({
    name: "Posts",
    initialState: {
        isLoading: true,
        posts: [],
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload.documents;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.error = true;
            state.isLoading = false;
            console.log(action.payload);
        });
    },
});

export default postSlice.reducer;
