import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/gyms">Gyms</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
