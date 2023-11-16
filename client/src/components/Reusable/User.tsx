import { Models } from "appwrite";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type UserCardProps = {
  user: Models.Document;
};

const User = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <Link to={`/profile/${user.$id}`} className="flex-center flex-col gap-4">
        <img
          src={user.imageURL || "/assets/profile_holder.svg"}
          alt="user"
          className="rounded-full w-14 h-14"
        />
        <div className="flex-center flex-col gap-1">
          <p className="base-medium text-light-1 text-center line-clamp-1">
            {user.name}
          </p>
          <p className="small-regular text-light-3 text-center line-clamp-1">
            @{user.username}
          </p>
        </div>
      </Link>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </div>
  );
};

export default User;
