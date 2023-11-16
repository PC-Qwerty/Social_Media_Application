import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useSignOutAccount } from "@/lib/React-Query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOutAccount, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-4 items-center">
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
        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOutAccount()}
          >
            <LogOutIcon />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageURL || "/assets/profile_holder.png"}
              alt="avatar"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
