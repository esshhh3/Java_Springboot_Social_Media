import {createSlice} from '@reduxjs/toolkit';
import { createPost, likePost, getAllPosts,  } from './post.action';

const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    like: null,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(createPost.pending,(state,action)=>{
            return {...state,loading:true,error:null};
        }),
        builder.addCase(createPost.fulfilled,(state,action)=>{
            return {...state,loading:false,post:action.payload,error:null,posts:[...state.posts,action.payload]};
        }),
        builder.addCase(createPost.rejected,(state,action)=>{
            return {...state,loading:false,error:action.payload};
        }),
        builder.addCase(getAllPosts.pending,(state,action)=>{
            return {...state,loading:true,error:null};
        }),
        builder.addCase(getAllPosts.fulfilled,(state,action)=>{
            return {...state,loading:false,posts:action.payload,error:null};
        }),
        builder.addCase(getAllPosts.rejected,(state,action)=>{
            return {...state,loading:false,error:action.payload};
        }),
        builder.addCase(likePost.pending,(state,action)=>{
            return {...state,loading:true,error:null};
        }),
        builder.addCase(likePost.fulfilled,(state,action)=>{
            return {...state,loading:false,like:action.payload,error:null,posts:state.posts.map((post)=>{
                if(post.id===action.payload.id){
                    return action.payload;
                }
                return post;
            })};
        }),
        builder.addCase(likePost.rejected,(state,action)=>{
            return {...state,loading:false,error:action.payload};
        });
    }
});

export default postSlice.reducer;