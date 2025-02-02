'use client'
import {Resource} from "@prisma/client";
import itemStyles from './items.module.css'
import {useEffect, useState} from "react";
import Modal from "@/app/components/Modal";
import ResourceView from "@/app/components/ResourceView";
import Image from "next/image";
export default function FeedItem({ Resource }: { Resource: Resource }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{ name: string; img: string } | null>(null);

    const users = [
        { name: 'Thomas Blake', img: '/thomas.svg' },
        { name: 'Shireen Amin', img: '/shireen.svg' },
    ];

    // ✅ Select a random user when the component mounts
    useEffect(() => {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        setSelectedUser(randomUser);
    }, []);

    return (
        <div className={itemStyles.feedItem} onClick={() => setIsModalOpen(true)}>
            {selectedUser && (
                <div className={itemStyles.userInfo}>

                    <Image src={selectedUser.img} alt={selectedUser.name} width={40} height={40} />
                    <span>{selectedUser.name} shared </span>
                    <h2>{Resource.title}</h2>

                </div>
            )}
            <div className={itemStyles.itemType}>{Resource.type.toLowerCase()}</div>

            <Modal isOpen={isModalOpen} onCloseAction={() => setIsModalOpen(false)}>
                <ResourceView Resource={Resource} />
            </Modal>
        </div>
    );
}