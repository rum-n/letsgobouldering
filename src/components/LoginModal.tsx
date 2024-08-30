import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  z-index: 1001;
  background-color: #b5b8a3;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 1rem;
`;

const ToggleLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;

  :hover {
    color: #0070f3;
    text-decoration: underline;
  }
`;

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const LoginModal = ({ showModal, closeModal }: ModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  if (!showModal) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/");
      closeModal();
    } else {
      setError("Invalid login credentials");
    }
  };

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
        closeModal();
      } else {
        setError("Invalid login attempt");
      }
    } catch (error) {
      setError("Failed to create account");
    }
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e)=>e.stopPropagation()}>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <Input type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
            <Input type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
            <Button type="submit">Login</Button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <Input           type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
            <Input type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
            <Button type="submit">Sign Up</Button>
          </form>
        )}
        <ToggleLink onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Login'}
        </ToggleLink>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
