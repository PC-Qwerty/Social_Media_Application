import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/dtypes";
import { useSignOutAccount } from "@/lib/React-Query/queriesAndMutations";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

const LeftSidebar = () => {
  const { user } = useUserContext();
  const { mutate: signOutAccount, isSuccess } = useSignOutAccount();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-2">
        <Link to="/" className="flex gap-4 items-center mb-5">
          <img
            src="/assets/logomain.png"
            alt="logomain"
            // width={130}
            // height={130}
            style={{
              height: "40px",
              position: "relative",
              top: "7px",
              objectFit: "contain",
              scale: "4",
              clipPath: "circle(13.2% at 52% 43%)",
            }}
          />
          <h2 className="h3-bold md:h4-bold">PC-Gram</h2>
        </Link>

        <ul className="flex flex-col gap-2">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-gray-800"
                }`}
                key={link.label}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-2 items-center p-2"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <Link
          to={`/profile/${user.id}`}
          className="flex gap-3 items-center mt-7"
        >
          <img
            src={user.imageURL || "/assets/profile_holder.png"}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">
              {user.username && "@" + user.username}
            </p>
          </div>
        </Link>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOutAccount()}
      >
        <LogOutIcon /> <p className="small-medium lg:base-medium">LogOut</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
