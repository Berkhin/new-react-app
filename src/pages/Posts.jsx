import React, { useEffect, useRef, useState } from "react";
import PostService from "../components/API/PostService";
import MyLoader from "../components/UI/Loader/MyLoader";
import Pagination from "../components/UI/pagination/Pagination";
import { getPagesCount } from "../components/UI/Utils/pages";
import useFetching from "../hooks/useFetching";
import { usePosts } from "../hooks/usePosts";
import MyModal from "../components/UI/myModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";

import "../styles/app.css";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/Select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [filter, setFilter] = useState({
    sort: "",
    query: "",
  });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCounts = response.headers["x-total-count"];
      setTotalPages(getPagesCount(totalCounts, limit));
    }
  );

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const changePage = (page) => {
    setPage(page);
  };

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="count element on the page"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "All" },
        ]}
      ></MySelect>
      {postError && <h1>Error ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="List JS posts"
      />
      <div ref={lastElement} style={{ height: 20, background: "red" }}></div>
      {isPostsLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <MyLoader />
        </div>
      )}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
