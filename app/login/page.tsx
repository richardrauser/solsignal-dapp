"use client";
import { title } from "@/components/primitives";
import { FirebaseClient } from "@/libs/FirebaseClient";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";

export default function LoginPage() {
  const loginWithGoogleTapped = async () => {
    let firebaseClient = new FirebaseClient();
    await firebaseClient.loginWithGoogle();
  };

  return (
    <div>
      <h1 className={title()}>Login</h1>

      <div className="mt-8">
        <Button color="primary" variant="flat" onClick={loginWithGoogleTapped}>
          Login with Google
        </Button>
      </div>
    </div>
  );
}
