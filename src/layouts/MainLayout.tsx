import { ReactNode } from "react";
import styled from 'styled-components';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
