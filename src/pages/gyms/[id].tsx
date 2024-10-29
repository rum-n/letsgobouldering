import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";
import styled from "styled-components";

interface Gym {
    id: number;
    name: string;
    location: string;
    description?: string;
    image: string;
}

interface GymPageProps {
    gym: Gym;
}

const GymPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`

const GymHeader = styled.div`
    width: 50%;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 1rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }`

const GymNameWrapper = styled.div`
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 30%;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 3rem 2rem;

    h1 {
        margin: 0;
    }`

const BackButton = styled.button`
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 8px;
    padding: 0.7rem 1.2rem;
    margin-bottom: 1rem;
    position: absolute;
    left: 1rem;
    top: 1rem;
`

const GymPage = ({ gym }: GymPageProps) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <GymPageWrapper>
            <BackButton onClick={() => router.back()}>Back</BackButton>
            <GymHeader>{gym.image && <img src={gym.image} alt={gym.name} />}</GymHeader>
            <GymNameWrapper><h1>{gym.name}</h1></GymNameWrapper>
            <p>{gym.location}</p>
            {gym.description && <p>{gym.description}</p>}
        </GymPageWrapper>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const gyms = await prisma.gym.findMany({
        select: { id: true },
    });

    const paths = (gyms as Gym[]).map((gym: Gym) => ({
        params: { id: gym.id.toString() },
    }));

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id;
    const gym = await prisma.gym.findUnique({
        where: { id: Number(id) },
    });

    if (!gym) {
        return { notFound: true };
    }

    return {
        props: { gym },
        revalidate: 60,
    };
};

export default GymPage;
