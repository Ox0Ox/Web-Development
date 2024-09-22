'use client'
import React from 'react'
import Link from 'next/link'
import { ModeToggle } from './themetoggle'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


const Navbar = () => {
    return (
        <nav className='flex items-center bg-background/60 justify-between sticky top-0 border-b backdrop-blur '>
            <div className="logo font-bold mx-5 text-3xl my-5">Blogger</div>
            <div className='flex items-center'>
                <ul className='hidden md:flex mx-10 mr-5 gap-10 text-xl items-center'>
                    <li className='hover:font-bold w-14'><Link href={'/'}>Home</Link></li>
                    <li className='hover:font-bold w-14'><Link href={'/about'}>About</Link></li>
                    <li className='hover:font-bold w-14'><Link href={'/blog'}>Blog</Link></li>
                    <li className='hover:font-bold w-28'><Link href={'/contact'}>Contact Us</Link></li>
                    <li className='hover:font-bold w-14'><Link href={'/login'}>Login</Link></li>
                    <li className='hover:font-bold w-20'><Link href={'/signup'}>Sign Up</Link></li>
                </ul>
                <div className="menu flex items-center md:hidden mr-5">
                    <Sheet>
                        <SheetTrigger><HamburgerMenuIcon className='size-5' /></SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className='text-2xl font-bold'>Links</SheetTitle>
                            </SheetHeader>
                            <div className='mt-5'>
                                {/* Removed hidden class */}
                                <ul className='flex flex-col gap-4 text-lg'>
                                    <li className='hover:font-bold'><Link href={'/'}>Home</Link></li>
                                    <li className='hover:font-bold'><Link href={'/about'}>About</Link></li>
                                    <li className='hover:font-bold'><Link href={'/blog'}>Blog</Link></li>
                                    <li className='hover:font-bold'><Link href={'/contact'}>Contact Us</Link></li>
                                    <li className='hover:font-bold'><Link href={'/login'}>Login</Link></li>
                                    <li className='hover:font-bold'><Link href={'/signup'}>Sign Up</Link></li>
                                </ul>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='mr-5'><ModeToggle /></div>
            </div>
        </nav>
    )
}

export default Navbar;
