import Link from 'next/link';
import React from 'react';
import { UserAvatarMenu } from './user-avatar-menu';
import { getSession } from '@/actions/session';
import { ThemeToggle } from './theme-toggle';

const AppBar = async () => {
    const session = await getSession({ fallback: false });

    return (
        <div className="flex items-center sticky top-0 justify-between p-4 shadow-sm bg-white dark:bg-black dark:text-white">
            <span className="flex space-x-4">
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
            </span>

            <div className="flex items-center space-x-4">
                <ThemeToggle />

                {!session || !session.user ? (
                    <div className="flex space-x-4">
                        <Link href="/auth/signin">Sign in</Link> <Link href="/auth/signup">Sign up</Link>
                    </div>
                ) : (
                    <UserAvatarMenu user={session.user} />
                )}
            </div>
        </div>
    );
};

export default AppBar;
