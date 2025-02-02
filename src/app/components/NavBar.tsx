'use client';

import Image from 'next/image';
import navStyle from './nav.module.css'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'

export default function NavBar() {
    return (
        <div className={navStyle.navBarContainer}>
            <div className={navStyle.logoBox}>
                <Image src='/logo.svg' alt="Logo" width={100} height={50} />
                <h2>Momentum</h2>
            </div>
            <div className={navStyle.navItems}>
                <div>
                    <Image
                        src='/growth.svg'
                        alt="growth"
                        width={20}
                        height={20}
                    />
                </div>
                <div>
                    <Image
                    src='/settings.svg'
                    alt="settings"
                    width={20}
                    height={20}
                    />
                </div>
                <div>
                    <Image
                        src='/bell.svg'
                        alt="bell"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
}