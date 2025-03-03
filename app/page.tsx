"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Signup from "@/components/Signup";
import ChallengeFriend from "@/components/ChallengeFriend";
import axios from "axios";
import PlayGame from "@/components/PlayGame";

export default function Home() {
  const searchParams = useSearchParams();
  const invitedBy = searchParams.get("invitedBy");
  interface Inviter {
    username: string;
    score: number;
  }

  const [inviter, setInviter] = useState<Inviter | null>(null);

  useEffect(() => {
    if (invitedBy) {
      axios.get(`/api/user/${invitedBy}`)
        .then((response) => setInviter(response.data))
        .catch((error) => console.error("Error fetching inviter:", error));
    }
  }, [invitedBy]);

  return (
    <div style={{ padding: "20px" }} className="h-screen relative">
      <h1 className="text-5xl text-center">Globetrotter Challenge</h1>
      {inviter && (
        <p>You were invited by {inviter.username} (Score: {inviter.score})</p>
      )}
      {
        localStorage.getItem("username")
        ? 
        <Suspense fallback={<div>Loading...</div>}>
          <PlayGame />
        </Suspense>
        : <Signup />
      }  
      <ChallengeFriend />
    </div>
  );
}