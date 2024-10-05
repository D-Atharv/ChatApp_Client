'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import favicon from '../../../../styles/svg/favicon.ico';
import '../../globals.css';

interface User {
    userId: string;
    name: string;
    image: string | null;
}

interface Group {
    id: string;
    isGroupChat: boolean;
    users: User[];
}

interface ProfileCardsProps {
    onSelectGroup: (groupId: string, groupName: string) => void; // Pass both groupId and groupName
}

export const ProfileCards = ({ onSelectGroup }: ProfileCardsProps) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('/api/group/allGroups');
                const data = await response.json();
                if (response.ok && data.response === 'success') {
                    setGroups(data.data); // Assuming data.data contains an array of groups
                } else {
                    throw new Error(data.message || 'Failed to retrieve groups');
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

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

    const handleSelectGroup = (group: Group) => {
        const groupName = group.isGroupChat ? 'Group Chat' : group.users[0].name;
        // Pass both groupId and groupName to the parent component
        onSelectGroup(group.id, groupName);
    };

    if (loading) {
        return <p className="text-white">Loading groups...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }


    return (
        <div
            ref={containerRef}
            className="w-full h-screen between_custom:w-[35%] sm:w-[100%] md:w-[40%] lg:w-1/3 p-4 max-w-full lg:max-w-lg bg-gray-900 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 overflow-y-auto scrollbar-hide"
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
                    {groups.map((group) => (
                        <li key={group.id} className="py-4" onClick={() => handleSelectGroup(group)}>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Image
                                        className="w-8 h-8 rounded-full cursor-pointer"
                                        src={favicon}
                                        alt="Group image"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-lg font-semibold text-gray-200 truncate dark:text-white cursor-pointer">
                                        {group.isGroupChat ? 'Group Chat' : group.users[0].name}
                                    </p>
                                    <p className="text-sm font-medium text-gray-200 truncate dark:text-white">
                                        Users: {group.users.map((u) => u.name).join(', ')}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

