import { ReactNode } from "react";
import NavBar from "../components/NavBar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({children}: MainLayoutProps) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
