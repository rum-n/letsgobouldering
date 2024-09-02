import { GetServerSideProps } from "next";

import MainLayout from "@/layouts/MainLayout";
import prisma from "@/lib/prisma";
import { Gym } from "@/types/Gym";

export const getServerSideProps: GetServerSideProps = async () => {
  const gyms = await prisma.gym.findMany();
  return {
    props: { gyms },
  };
};

const GymList = (gyms: Gym[]) => {
  return (
    <MainLayout>
      <h1>Gyms</h1>
      <ul>
        {gyms.map((gym) => (
          <li key={gym.id}>
            {gym.name} - {gym.address}
          </li>
        ))}
      </ul>
    </MainLayout>
  );
};

export default GymList;
