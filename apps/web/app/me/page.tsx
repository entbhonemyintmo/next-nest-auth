import { getProfile } from '@/actions';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Authentication mechanism between Next and Nest',
};

const Me = async () => {
    const data = await getProfile();

    return (
        <main className="w-full flex-1 flex flex-col gap-5 justify-center items-center">
            <h1 className="text-6xl">
                Profile <span>🦊</span>
            </h1>
            <div className="bg-primary-foreground border w-[30%] min-h-[10rem] max-h-52 content-center rounded-lg text-center text-green-500 text-sm p-4">
                <p className="w-full text-wrap">{JSON.stringify(data)}</p>
            </div>
        </main>
    );
};

export default Me;
