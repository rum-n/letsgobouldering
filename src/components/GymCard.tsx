import { Gym } from "@/types/Gym";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

interface GymCardProps {
  gym: Gym;
  isFollowing: boolean;
}

const GymCardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  max-width: 320px;
  width: 100%;
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
  margin: 0.5rem 0;
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


const GymCard = ({ gym, isFollowing }: GymCardProps) => {
  const { data: session } = useSession();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFollow = async (id: number) => {
    try {
      await fetch(`/api/gyms/${id}/follow`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error following gym:', error);
      setError('An error occurred while following the gym');
    }
  };

  return (
    <GymCardContainer>
      <GymCardBackgroundImage image={gym.image} />
      <GymCardContent>
        <GymTitle>{gym.name}</GymTitle>
        <GymAddress>{gym.address}</GymAddress>
        <ActionsWrapper>
          <Link href={`/gyms/${gym.id}`} style={{
          }}>See details</Link>
          {session && !isFollowing && <FollowButton onClick={() => handleFollow(gym.id)} disabled={isFollowing}>Follow</FollowButton>}
        </ActionsWrapper>
      </GymCardContent>
    </GymCardContainer>
  );
};

export default GymCard;