'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import favicon from '../../../../styles/svg/favicon.ico';
import '../../globals.css';
import { group } from 'console';

type ProfileCardProps = {
    onSelectUser : (user: string) => void;
    currentUserID : string;
}

type Group = {
    id: string,
    title?: string,
    isGroupChat: boolean,
    users: {
        userId: string,
        name: string,
    }[],
}

export default function ProfileCards({onSelectUser, currentUserID}: ProfileCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [groups,setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/group/allGroups');
                if(!response.ok){
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log(data.data);
                setGroups(data.data);
            }catch(error){
                console.error("Failed to fetch Groups",error);
            }
        }

        fetchGroups();

    },[]);

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


    const getGroupTitle = (group: Group): string => {
        if (group.isGroupChat) {
            return group.title || 'Group Chat';
        } else {
            const otherUser = group.users.find(user => user.userId !== currentUserID);
            return otherUser ? otherUser.name : 'Unknown User';
        }
    };

    const handleSelectGroup = (group : Group) => {
        onSelectUser(group.id);
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-screen sm:w-[100%] md:w-[40%] lg:w-1/3 p-4 max-w-full lg:max-w-lg bg-gray-900 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 overflow-y-auto scrollbar-hide"
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
                    {groups.map((group, index) => (
                        <li key={index} className="py-4" onClick={() => handleSelectGroup(group)}>
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
                                        {getGroupTitle(group)}
                                    </p>
                                    <p className="text-sm font-medium text-gray-200 truncate dark:text-white">
                                        Users: {group.users.map(u => u.name).join(', ')}
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


