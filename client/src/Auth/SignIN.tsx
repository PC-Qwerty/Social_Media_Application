import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/lib/Validation/Schemas";
import { z } from "zod";
import Loader from "@/components/Reusable/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

import { useSignInAccount } from "@/lib/React-Query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignIN = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        title: "Login Failed",
      });
    }

    // if session exists then authorixation is checked..
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({
        title: "Login Failed",
      });
    }
  }
  return (
    <Form {...form}>
      <div
        className="sm:w-420 flex-center flex-col p-5"
        // style={{ border: "2px solid grey" }}
      >
        <div className="flex justify-start gap-5 items-center">
          <img
            src="/assets/logomain.png"
            style={{
              height: "40px",
              position: "relative",
              top: "7px",
              objectFit: "contain",
              scale: "4",
              clipPath: "circle(13.2% at 52% 43%)",
            }}
          />
          <h1 className="h2-bold md:h1-bold">PC-Gram</h1>
        </div>
        <h2 className="h4-bold md:h3-bold pt-5 sm:pt-8">Login to continue</h2>
        <p className="text-light-2 small-medium md:base-regular pt-2">
          Welcome Back!
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-col space-y-5 w-full mt-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    className="shad-input"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary w-full">
            {isUserLoading || isPending ? (
              <div className="flex gap-3 items-center">
                <Loader />
                Loading...
              </div>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-small-regular text-light-3 text-center ">
            Don't have an account?
            <Link to="/signup" className="text-blue-600">
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignIN;
