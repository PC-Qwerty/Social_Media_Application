// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

import PostForm from "@/components/forms/PostForm";

const Create = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/add-post.svg" alt="add" width={36} height={36} />
          <h2 className="h4-bold md:h3-bold text-left w-full">Create Post</h2>
        </div>
        <PostForm action="Create" />
      </div>
    </div>

    // <Dialog>
    //   <DialogTrigger>
    //     <Button variant="outline">Edit Profile</Button>
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-[425px]">
    //     <DialogHeader>
    //       <DialogTitle>Edit profile</DialogTitle>
    //       <DialogDescription>
    //         Make changes to your profile here. Click save when you're done.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <div className="grid gap-4 py-4">
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <Label htmlFor="name" className="text-right">
    //           Name
    //         </Label>
    //         <Input
    //           id="name"
    //           defaultValue="Pedro Duarte"
    //           className="col-span-3"
    //         />
    //       </div>
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <Label htmlFor="username" className="text-right">
    //           Username
    //         </Label>
    //         <Input
    //           id="username"
    //           defaultValue="@peduarte"
    //           className="col-span-3"
    //         />
    //       </div>
    //     </div>
    //     <DialogFooter>
    //       <Button type="submit">Save changes</Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
};

export default Create;
