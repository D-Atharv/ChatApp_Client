'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import favicon from '../../../../styles/svg/favicon.ico';
import '../../globals.css';

export default function ProfileCards() {
    const containerRef = useRef<HTMLDivElement>(null);

    const customers = [
        { name: "Neil Sims", email: "email@windster.com", amount: "$320", imgSrc: favicon },
        { name: "Bonnie Green", email: "email@windster.com", amount: "$3467", imgSrc: favicon },
        { name: "Michael Gough", email: "email@windster.com", amount: "$67", imgSrc: favicon },
        { name: "Lana Byrd", email: "email@windster.com", amount: "$367", imgSrc: favicon },
        { name: "Thomas Lean", email: "email@windster.com", amount: "$2367", imgSrc: favicon },
        { name: "Neil Sims", email: "email@windster.com", amount: "$320", imgSrc: favicon },
        { name: "Bonnie Green", email: "email@windster.com", amount: "$3467", imgSrc: favicon },
        { name: "Michael Gough", email: "email@windster.com", amount: "$67", imgSrc: favicon },
        { name: "Lana Byrd", email: "email@windster.com", amount: "$367", imgSrc: favicon },
        { name: "Thomas Lean", email: "email@windster.com", amount: "$2367", imgSrc: favicon },
        { name: "Neil Sims", email: "email@windster.com", amount: "$320", imgSrc: favicon },
        { name: "Bonnie Green", email: "email@windster.com", amount: "$3467", imgSrc: favicon },
        { name: "Michael Gough", email: "email@windster.com", amount: "$67", imgSrc: favicon },
        { name: "Lana Byrd", email: "email@windster.com", amount: "$367", imgSrc: favicon },
        { name: "Thomas Lean", email: "email@windster.com", amount: "$2367", imgSrc: favicon },
    ];

    useEffect(() => {
        const updateContainerHeight = () => {
            if (containerRef.current) {
                const footerHeight = 50;
                const newMaxHeight = window.innerHeight - footerHeight - containerRef.current.getBoundingClientRect().top;
                containerRef.current.style.maxHeight = `${newMaxHeight}px`;
            }
        };

        updateContainerHeight();
        window.addEventListener('resize', updateContainerHeight);

        return () => window.removeEventListener('resize', updateContainerHeight);
    }, []);

    return (
        <div
            ref={containerRef}
            // className="w-full p-4 max-w-full lg:max-w-lg bg-gray-900 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 overflow-y-auto custom-scrollbar"
            className="w-full sm:w-1/2 md:w-[40%] lg:w-1/3  p-4 max-w-full lg:max-w-lg bg-gray-900 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 overflow-y-auto custom-scrollbar"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
        >
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-white dark:text-white">Chat</h5>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View all
                </a>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {customers.map((customer, index) => (
                        <li key={index} className="py-4 ">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Image
                                        className="w-8 h-8 rounded-full"
                                        src={customer.imgSrc}
                                        alt={`${customer.name} image`}
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-200 truncate dark:text-white">
                                        {customer.name}
                                    </p>
                                    <p className="text-sm text-gray-400 truncate dark:text-gray-400">
                                        {customer.email}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-400 dark:text-white">
                                    {customer.amount}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
