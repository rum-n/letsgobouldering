import { signIn, signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import { useState } from 'react';
import styled from "styled-components";
import Modal from './Modal';

const NavBarContainer = styled.nav`
  position: relative;
  z-index: 2;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem;
`;

const LogoContainer = styled.div``;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    }
  li {
      margin-right: 1rem;
    }
  a {
      text-decoration: none;
      font-size: 1.2rem;
    }
`;

const NavButton = styled.button`
  background-color: #b5b8a3;
  color: #000;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  
  :hover {
    background-color: #a69399;
  }
`;

const NavBar = () => {
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);

  return (
    <NavBarContainer>
      <LogoContainer>
        <h1>Let's go bouldering</h1>
      </LogoContainer>
      <MenuContainer>
      <ul>
        <li>
          <Link href="/gyms">Gyms</Link>
        </li>
        <li>
          <Link href="/gyms">Map</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </ul>
        {session ? (
          <>
          <Link href="/profile" style={{ marginRight: "10px" }}>
            Profile
          </Link>
          <NavButton onClick={() => signOut()} style={{ marginLeft: "10px" }}>
            Logout
            </NavButton>
          </>
          ) : (
            <>
          <NavButton onClick={() => setShowModal(true)} style={{ marginLeft: "10px" }}>
            Login
          </NavButton>
          </>
        )}
        <Modal showModal={showModal} closeModal={handleModalClose} />
      </MenuContainer>
    </NavBarContainer>
  );
};

export default NavBar;
