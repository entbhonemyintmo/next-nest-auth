import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Authentication mechanism between Next and Nest',
};

const Me = () => {
    return (
        <main className="w-full flex-1 flex justify-center items-center">
            <h1 className="text-6xl">
                Profile <span>🦊</span>
            </h1>
        </main>
    );
};

export default Me;
