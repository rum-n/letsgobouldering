import { Gym } from "@/types/Gym";
import React from "react";

interface GymCardProps {
    gym: Gym;
}

const GymCard = ({ gym }: GymCardProps) => {
  return (
    <div className="gym-card">
      <h2>{gym.name}</h2>
      <p>{gym.location}</p>
      <p>{gym.description}</p>
    </div>
  );
};

export default GymCard;