import Loader from "@/components/Reusable/Loader";
import User from "@/components/Reusable/User";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/React-Query/queriesAndMutations";

const People = () => {
  const { toast } = useToast();

  const { data: users, isLoading, isError: isErrorCreators } = useGetUsers();
  // console.log(users);

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !users ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {users?.documents.map((user) => (
              <li key={user?.$id} className="flex-1 min-w-[200px] w-full  ">
                <User user={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default People;
