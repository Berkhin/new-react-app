import React from "react";
import { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({create}) => {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPosts = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    }
    create(newPost)
    setPost({ title: "", body: "" });
  };

  return (
    <form>
      <MyInput
        type="text"
        placeholder="name of posts"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <MyInput
        type="text"
        placeholder="name of posts"
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
      />
      {/* <MyInput type="text" placeholder="discription of posts" ref={bodyInputRef}/> */}
      <MyButton onClick={addNewPosts}>Create Posts</MyButton>
    </form>
  );
};

export default PostForm;
