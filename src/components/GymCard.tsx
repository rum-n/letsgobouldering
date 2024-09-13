import { Gym } from "@/types/Gym";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface GymCardProps {
  gym: Gym;
}

const GymCardContainer = styled.div`
  background-color: #7C7C7C;
  border-radius: 8px;
  max-width: 320px;
  width: 100%;
  height: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GymCardContent = styled.div`
  padding: 0 0.7rem 0.7rem;
`

const GymCardBackgroundImage = styled.div<{ image?: string }>`
  background-image: url(${(props) => props.image || ''});
  background-size: cover;
  background-position: center;
  height: 200px;
  border-radius: 8px;
`;

const GymTitle = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const GymAddress = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const FollowButton = styled.button``


const GymCard = ({ gym }: GymCardProps) => {
  const { data: session } = useSession();

  return (
    <GymCardContainer>
      <GymCardBackgroundImage image={gym.image} />
      <GymCardContent>
        <GymTitle>{gym.name}</GymTitle>
        <GymAddress>{gym.address}</GymAddress>
        <ActionsWrapper>
          <Link href={`/gyms/${gym.id}`} style={{
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            fontWeight: 'bold',
            border: '1px solid #000'
          }}>See details</Link>
          {session && <FollowButton>Follow</FollowButton>}
        </ActionsWrapper>
      </GymCardContent>
    </GymCardContainer>
  );
};

export default GymCard;