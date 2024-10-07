"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

import { useAuth } from "@/context/AuthUserContext";

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const { authUser, authLoading } = useAuth();

    useEffect(() => {
      if (!authLoading && !authUser) {
        console.log("No user, redirecting to home screen..");
        redirect("/login");
      }
    }, [authUser]);

    // if (!session) {
    //   return null;
    // }
    return <WrappedComponent {...props} />;
  };
};
