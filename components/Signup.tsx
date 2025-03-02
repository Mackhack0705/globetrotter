import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", { username });
      if(response.data.user) {
        localStorage.setItem("username", response.data.user.username);
        router.refresh();
      }
      console.log("User registered:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Registration failed");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a unique username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit" className="mr-4 cursor-pointer">Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default RegisterUser;