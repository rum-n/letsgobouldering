import React from "react";
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
    gap: 1rem;
    margin: 1rem;
`;

const GymGrid = ({ gyms }: GymCardProps) => {
    return (
        <GymGridContainer>
            {gyms.map((gym) => (
                <GymCard key={gym.id} gym={gym} />
            ))}
        </GymGridContainer>
    );
}

export default GymGrid;