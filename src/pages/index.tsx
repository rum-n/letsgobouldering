import GymGrid from "@/components/GymGrid";
import NavBar from "@/components/NavBar";
import MainLayout from "@/layouts/MainLayout";
import { Gym } from "@/types/Gym";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import styled from "styled-components";

export interface GymsResponse {
  gyms: Gym[];
  page: number;
  totalGyms: number;
  totalPages: number;
}

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
  border: 1px solid #333;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  margin: 0 1rem;
`;

const GymListToolbar = styled.div`
  display: flex;
  margin: 0 2rem 2rem 2rem;
  justify-content: center;
  align-items: center;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
`

const PaginationButton = styled.button`
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    border: 1px solid #333;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:hover {
        background-color: #f0f0f0;
    }
`

const HomePage = () => {
  const [gymsData, setGymsData] = useState<GymsResponse>();
  const [allGyms, setAllGyms] = useState<GymsResponse>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllGyms = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/gyms/get?page=${page}&limit=20`);
      const data = await response.json();
      setGymsData(data);
      setAllGyms(data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching gyms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGyms(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchQuery.trim() === '') {
      setGymsData(allGyms);
    } else {
      searchParams.append('search', searchQuery);
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/gyms/get?page=${page}&limit=20&${searchParams.toString()}`);
      const data = await response.json();
      setGymsData(data);
      setTotalPages(data.totalPages);
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
          <h1>Start your week with a climb</h1>
          <p>All your favourite climbing gyms, no matter where you go.</p>
        </HeadingWraper>
      </HeroWrapper>
      <GymListToolbar>
        <form onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search gyms by name, city, or country"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</SearchButton>
        </form>
      </GymListToolbar>
      {!loading && gymsData ? <GymGrid gyms={gymsData.gyms} /> : <div>Loading...</div>}
      <Pagination>
        <PaginationButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </PaginationButton>
        <span>Page {page} of {totalPages}</span>
        <PaginationButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </PaginationButton>
      </Pagination>
    </MainLayout>
  );
};

export default HomePage;
