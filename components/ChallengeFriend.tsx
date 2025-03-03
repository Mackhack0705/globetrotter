import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ChallengeFriend = () => {
  const [inviteLink, setInviteLink] = useState("");

  const handleGenerateInvite = async () => {
    console.log('hi there');
    
    try {
      const response = await axios.post("/api/generate-invite");
      setInviteLink(response.data.inviteLink);
    } catch (error) {
      console.error("Error generating invite:", error);
    }
  };

  const handleShare = () => {
    if (inviteLink) {
      const message = `Join me in the Globetrotter Challenge! My score: 100. Play now: ${inviteLink}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div>
      <div className="w-1/4 absolute left-2/5 flex justify-between">
        <Input placeholder="Enter friend's username" className="w-56" />
        <Button className="cursor-pointer" onClick={handleGenerateInvite}>Challenge a Friend</Button>
      </div>
      {inviteLink && (
        <div>
          <p>Invite Link: {inviteLink}</p>
          <Button onClick={handleShare}>Share via WhatsApp</Button>
        </div>
      )}
    </div>
  );
};

export default ChallengeFriend;