// import { INavLink } from '@/dtypes';

// import {HomeIcon}  from 'lucide-react';
export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageURL: "",
  bio: "",
};

export const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

// const HomeIcon = () => {return <HomeIcon />}

export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons8-reels-24.svg",
    route: "/reels",
    label: "Reels",
  },
  {
    imgURL: "/assets/icons8-messenger-24.svg",
    route: "/messages",
    label: "Messages",
  },
  {
    imgURL: "/assets/people.svg",
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: "/assets/notification.svg",
    route: "/notifications",
    label: "Notifications",
  },
  {
    imgURL: "/assets/saved.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/add-post.svg",
    route: "/create",
    label: "Create",
  },
];

export const bottombarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/saved.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/add-post.svg",
    route: "/create",
    label: "Create",
  },
];

export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_USER_BY_ID = "getUserById",

  // POST KEYS
  GET_POSTS = "getPosts",
  GET_INFINITE_POSTS = "getInfinitePosts",
  GET_RECENT_POSTS = "getRecentPosts",
  GET_POST_BY_ID = "getPostById",
  GET_USER_POSTS = "getUserPosts",
  GET_FILE_PREVIEW = "getFilePreview",

  //  SEARCH KEYS
  SEARCH_POSTS = "getSearchPosts",
}
