import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Gym } from "@/types/Gym";
import GymCard from "./GymCard";

interface GymCardProps {
    gyms: Gym[];
}

const GymGridContainer = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin: 1rem;
    padding: 0 5rem;
`;

const GymGrid = ({ gyms }: GymCardProps) => {
    const [followedGymIds, setFollowedGymIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchFollowedGyms = async () => {
            try {
                const res = await fetch('/api/user/follows');
                if (res.ok) {
                    const data = await res.json();
                    setFollowedGymIds(data.map((gym: Gym) => gym.id));
                }
            } catch (error) {
                console.error('Error fetching followed gyms:', error);
            }
        };

        fetchFollowedGyms();
    }, []);

    const isFollowingGym = useCallback((gym: Gym) => {
        return followedGymIds.some((id) => id === gym.id);
    }, [followedGymIds]);

    return (
        <GymGridContainer>
            {gyms?.map((gym) => (
                <GymCard key={gym.id} gym={gym} isFollowing={isFollowingGym(gym)} />
            ))}
        </GymGridContainer>
    );
}

export default GymGrid;