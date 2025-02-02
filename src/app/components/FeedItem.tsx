'use client'
import { faker } from '@faker-js/faker';
import {Resource} from "@prisma/client";
import itemStyles from './items.module.css'
import {useState} from "react";
import Modal from "@/app/components/Modal";
import ResourceView from "@/app/components/ResourceView";
export default function FeedItem({Resource}: {Resource: Resource}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className={itemStyles.feedItem} onClick={() => setIsModalOpen(true)}>

            <p><span>{faker.person.firstName()} {faker.person.lastName()} shared </span> {Resource.title}</p>
            <div className={itemStyles.itemType}>{Resource.type.toLocaleLowerCase()}</div>
            <Modal isOpen={isModalOpen} onCloseAction={() => setIsModalOpen(false)}>

               <ResourceView Resource={Resource}/>
            </Modal>
        </div>
    )
}