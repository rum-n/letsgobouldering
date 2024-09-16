import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import prisma from "../../lib/prisma";
import Image from "next/image";

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

const GymPage = ({ gym }: GymPageProps) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{gym.name}</h1>
            <p>{gym.location}</p>
            {gym.description && <p>{gym.description}</p>}
            {gym.image && <Image src={gym.image} alt={gym.name} />}
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const gyms = await prisma.gym.findMany({
        select: { id: true },
    });

    const paths = gyms.map((gym) => ({
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
