'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import favicon from '../../../../styles/svg/favicon.ico';

export default function ProfileCards() {
    const [visibleCards, setVisibleCards] = useState<number>(10);

    const customers = [
        {
            name: "Neil Sims",
            email: "email@windster.com",
            amount: "$320",
            imgSrc: favicon,
        },
        {
            name: "Bonnie Green",
            email: "email@windster.com",
            amount: "$3467",
            imgSrc: favicon,
        },
        {
            name: "Michael Gough",
            email: "email@windster.com",
            amount: "$67",
            imgSrc: favicon,
        },
        {
            name: "Lana Byrd",
            email: "email@windster.com",
            amount: "$367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
        // More customers to fill up to 10 cards for demo purposes
        {
            name: "Neil Sims",
            email: "email@windster.com",
            amount: "$320",
            imgSrc: favicon,
        },
        {
            name: "Bonnie Green",
            email: "email@windster.com",
            amount: "$3467",
            imgSrc: favicon,
        },
        {
            name: "Michael Gough",
            email: "email@windster.com",
            amount: "$67",
            imgSrc: favicon,
        },
        {
            name: "Lana Byrd",
            email: "email@windster.com",
            amount: "$367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
        {
            name: "Thomas Lean",
            email: "email@windster.com",
            amount: "$2367",
            imgSrc: favicon,
        },
    ];

    const cardsToShow = customers.slice(0, 10); // Always show up to 10 cards

    return (
        <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Chat</h5>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View all
                </a>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cardsToShow.map((customer, index) => (
                        <li key={index} className="py-3 sm:py-4">
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
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {customer.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {customer.email}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
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

