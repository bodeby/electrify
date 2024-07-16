"use client";

import React from "react"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/dashboard"); // Redirect to the main app if authenticated
  }, [router]);

  return <div>Redirecting...</div>;
}
