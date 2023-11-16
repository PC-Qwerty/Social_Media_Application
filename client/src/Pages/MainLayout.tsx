import BottomBar from "@/components/Reusable/BottomBar";
import LeftSidebar from "@/components/Reusable/LeftSidebar";
import Topbar from "@/components/Reusable/Topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      {/* <div className="hidden md:block"> */} {/* check this */}
      <LeftSidebar />
      {/* </div> */}
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <BottomBar />
    </div>
  );
};

export default MainLayout;
