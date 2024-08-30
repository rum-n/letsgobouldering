import { Gym } from "@/types/Gym";
import React from "react";
import styled from "styled-components";

interface GymCardProps {
    gym: Gym;
}

const GymCardContainer = styled.div`
  background-color: #b5b8a3;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem;
  max-width: 300px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GymCardBackgroundImage = styled.div<{ image?: string }>`
  background-image: url(${(props) => props.image || ''});
  background-size: cover;
  background-position: center;
  height: 200px;
  border-radius: 8px;
`;

const GymCard = ({ gym }: GymCardProps) => {
  return (
    <GymCardContainer>
      <GymCardBackgroundImage image={gym.image} />
      <h2>{gym.name}</h2>
      <p>{gym.address}</p>
      <p>{gym.description}</p>
    </GymCardContainer>
  );
};

export default GymCard;