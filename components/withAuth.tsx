"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthUserContext";

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const { authUser, authLoading } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (!authUser) {
        redirect("/login");
      }
    }, []);

    // if (!session) {
    //   return null;
    // }
    return <WrappedComponent {...props} />;
  };
};
