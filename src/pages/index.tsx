import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

const HomePage = () => {
  return (
    <MainLayout>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Welcome to Climbing Gym Directory</h1>
        <p>Your ultimate source for finding climbing gyms worldwide.</p>
        <div>
          <Link href="/gyms" style={{ marginRight: "1rem", fontSize: "1.2rem" }}>
              Browse Gyms
          </Link>
          <Link href="/auth/signup" style={{ fontSize: "1.2rem" }}>
            Sign Up
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
