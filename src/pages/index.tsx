import NavBar from "@/components/NavBar";
import MainLayout from "@/layouts/MainLayout";
import styled from "styled-components";

const GymGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const HeadingWraper = styled.div`
  position: relative;
  z-index: 2; 
  color: white; 
  text-align: center;
  margin-top: 5rem;
  padding: 20px;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
  }
  `;

const VideoWrapper = styled.div`
  video {
    position: absolute;
    width: 100%;
    height: auto;
    z-index: -1;
    top: 0;
    }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 102.5vh;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1;
`;

const HeroWrapper = styled.div`
  height: 100vh;
`;

const HomePage = () => {
  return (
    <MainLayout>
      <HeroWrapper>
      <NavBar />
      <VideoWrapper>
      <video autoPlay muted loop>
        <source src="/climbing1.mp4" type="video/mp4" />
      </video>
      <Overlay />
      </VideoWrapper>
      <HeadingWraper>
        <h1>Indoor climbing, everywhere</h1>
        <p>All your favourite climbing gyms, no matter where you go.</p>
      </HeadingWraper>
      </HeroWrapper>
      <GymGridContainer>
        <h2>Search</h2>
        {/* GymList component goes here */}
      </GymGridContainer>
    </MainLayout>
  );
};

export default HomePage;
