import categoriesAPI from "./categories.api";
import lecturesAPI from "./lectures.api";
import likesAPI from "./likes.api";
import loungesAPI from "./lounge.api";
import postsAPI from "./posts.api";
import profilesAPI from "./profile.api";

const api = {
  lounges: loungesAPI,
  categories: categoriesAPI,
  posts: postsAPI,
  lectures: lecturesAPI,
  likes: likesAPI,
  profiles: profilesAPI,
};

export default api;
