import { Gym } from "@/types/Gym";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface GymCardProps {
  gym: Gym;
}

const GymCardContainer = styled.div`
  background-color: #7C7C7C;
  border-radius: 8px;
  margin: 1rem;
  max-width: 320px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `;

const GymCardContent = styled.div`
  padding: 0 1rem 1rem;
`

const GymCardBackgroundImage = styled.div<{ image?: string }>`
  background-image: url(${(props) => props.image || ''});
  background-size: cover;
  background-position: center;
  height: 200px;
  border-radius: 8px;
`;

const GymCard = ({ gym }: GymCardProps) => {
  return (
    <Link href={`/gyms/${gym.id}`}>
      <GymCardContainer>
        <GymCardBackgroundImage image={gym.image} />
        <GymCardContent>
          <h2>{gym.name}</h2>
          <p>{gym.address}</p>
          <p>{gym.description}</p>
        </GymCardContent>
      </GymCardContainer>
    </Link>
  );
};

export default GymCard;