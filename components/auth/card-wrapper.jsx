"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import { signIn } from "next-auth/react";

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  loading,
  setLoading,
  visitorUsername,
  showSocial,
}) => {

  const handleVisitorLogin = async () => {
    try {
      setLoading(true);
      if (visitorUsername) {
        setLoading(true);
        const signInRes = await signIn("credentials", {
          redirect: true,
          username: visitorUsername,
          password: visitorUsername,
          callbackUrl: "/all",
        });
      }
      else {
        // call api to generate new visitor account in db
        const res = await fetch(`/api/auth/visitor-login`, {
          method: "POST",
        });
        const data = await res.json();
        // should return newly created user object
        const signInRes = await signIn("credentials", {
          redirect: true,
          username: data.user.username,
          password: data.user.username,
          callbackUrl: "/all"
        });
  
      }

    }
    catch (err) {
      setLoading(false);
      alert("Visitor login failed. Try clearing your cookies.")
    }
  }

  return (
    <Card className="lg:w-[500px] min-w-[300px] border-none">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )} */}
      <CardFooter className="flex flex-col">
          <Button variant="link" disabled={loading} onClick={handleVisitorLogin} className="font-normal w-full" size="sm">
            Login as visitor
         </Button>
        <BackButton loading={loading} label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
