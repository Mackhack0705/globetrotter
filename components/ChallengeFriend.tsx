import axios from "axios";
import { useState } from "react";

const ChallengeFriend = ({ username }: { username: string}) => {
  const [inviteLink, setInviteLink] = useState("");

  const handleGenerateInvite = async () => {
    try {
      const response = await axios.post("/api/generate-invite", { username });
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
      <button onClick={handleGenerateInvite}>Challenge a Friend</button>
      {inviteLink && (
        <div>
          <p>Invite Link: {inviteLink}</p>
          <button onClick={handleShare}>Share via WhatsApp</button>
        </div>
      )}
    </div>
  );
};

export default ChallengeFriend;