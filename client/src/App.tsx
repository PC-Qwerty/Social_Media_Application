import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "./Pages/MainLayout";
import {
  Create,
  EditPost,
  Explore,
  Home,
  Messages,
  Notifications,
  People,
  PostPage,
  Profile,
  Reels,
  Saved,
  UpdateProfile,
} from "./Pages";
import { AuthLayout, SignIN, SignUP } from "./Auth";

const App = () => {
  return (
    <div className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<SignIN />} />
          <Route path="/signup" element={<SignUP />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/all-users" element={<People />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create" element={<Create />} />

          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
