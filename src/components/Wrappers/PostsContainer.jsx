import PostsPage from "../../PostsPage";
import withLoading from "../../hocs/withLoading";
import useAxiosQuery from "../../hooks/useAxiosQuery";

const PostsPageWithLoading = withLoading(PostsPage);

const PostsContainer = ({ getUser }) => {
  const { data: posts, isLoading, setData: setPosts } = useAxiosQuery("posts");

  return (
    <PostsPageWithLoading
      posts={posts}
      isLoading={isLoading}
      getUser={getUser}
    />
  );
};

export default PostsContainer;
