import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn } from "next-auth/react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", { email, password });
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.ok) {
        router.push("/");
      } else {
        setError("Invalid login attempt");
      }
    } catch (error) {
      setError("Failed to create account");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignupPage;
