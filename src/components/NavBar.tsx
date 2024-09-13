import { signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import styled from "styled-components";
import LoginModal from './LoginModal';
import AddGymModal from './AddGymModal';
import { User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
  role?: string;
}

const NavBarContainer = styled.nav<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: ${(props) => (props.isScrolled ? '#7c7c7c78' : 'transparent')};
  transition: background-color 0.3s ease;
  box-shadow: ${(props) => (props.isScrolled ? '0 2px 5px rgba(0,0,0,0.1)' : 'none')};
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
  color: #000;
  cursor: pointer;
  margin-left: 1rem;
`;

const NavBar = () => {
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);
  const [showAddGymModal, setShowAddGymModal] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleModalClose = () => setShowModal(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NavBarContainer isScrolled={isScrolled}>
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
            <Link href="/profile">
              Profile
            </Link>
            <NavButton onClick={() => signOut()}>
              Logout
            </NavButton>
            {(session.user as User)?.role === "owner" && <NavButton onClick={() => setShowAddGymModal(true)}>Add new gym</NavButton>}
          </>

        ) : (
          <>
            <NavButton onClick={() => setShowModal(true)}>
              Login
            </NavButton>
          </>
        )}
        <LoginModal showModal={showModal} closeModal={handleModalClose} />
        <AddGymModal showModal={showAddGymModal} closeModal={() => setShowAddGymModal(false)} />
      </MenuContainer>
    </NavBarContainer>
  );
};

export default NavBar;
