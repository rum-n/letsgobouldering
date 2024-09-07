import GymGrid from "@/components/GymGrid";
import NavBar from "@/components/NavBar";
import MainLayout from "@/layouts/MainLayout";
import { Gym } from "@/types/Gym";
import { useEffect, useState } from "react";
import styled from "styled-components";

const HeadingWraper = styled.div`
  position: relative;
  z-index: 1; 
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

const SearchInput = styled.input`
  width: 30rem;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f3f3f3;
  cursor: pointer;
  margin: 0 1rem;
`;

const GymListToolbar = styled.div`
  display: flex;
  margin: 0 2rem 2rem 2rem;
  justify-content: center;
  align-items: center;
`;

const HomePage = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllGyms = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/gyms/get');
        const data = await response.json();
        setGyms(data);
      } catch (error) {
        console.error('Error fetching gyms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGyms();
  }, []);

  const handleSearch = async () => {
    // event.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/gyms/get?search=${searchQuery}`);
      const data = await response.json();
      setGyms(data);
    } catch (error) {
      console.error('Error fetching gyms:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <GymListToolbar>
        <SearchInput
          type="text"
          placeholder="Search gyms by name, city, or country"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </GymListToolbar>
      {!loading ? <GymGrid gyms={gyms} /> : <p>Loading...</p>}
    </MainLayout>
  );
};

export default HomePage;
