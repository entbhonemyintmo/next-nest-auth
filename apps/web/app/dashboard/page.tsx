import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Authentication mechanism between Next and Nest',
};

const Dashboard = async () => {
    return (
        <main className="w-full flex-grow flex justify-center items-center">
            <h1 className="text-6xl">
                Dashboard <span>👦</span>
            </h1>
        </main>
    );
};

export default Dashboard;
