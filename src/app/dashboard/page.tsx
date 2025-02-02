'use client'
import dashStyle from './page.module.css'
import Image from "next/image";
import FeedWidget from "@/app/components/FeedWidget";
import AnnouncementWidget from "@/app/components/AnnouncementWidget";
import Modal from "@/app/components/Modal";
import {useState} from "react";
import CreateResource from "@/app/components/CreateResource";
import Link from 'next/link';
export default function DashboardPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className={dashStyle.dashContent}>
            <div className={dashStyle.dashGrid}>
                <div className={dashStyle.dashCol}>
                    <Image src="/connectWidget.svg" alt="connections" width='665' height={425}/>
                    <FeedWidget/>
                </div>
                <div className={dashStyle.dashCol}>
                    <Image src="/aiWidget.svg" alt="ai" width='350' height={140}/>
                    <Image src="/gameStatus.svg" alt="game status" width='350' height={267}/>
                    <AnnouncementWidget/>
                    <Image src="/libWidget.svg" alt="lib" width='350' height={126}  onClick={() => setIsModalOpen(true)}/>
                </div>
                <div className={dashStyle.dashCol}>
                    <Image src="/wrapUp.svg" alt="lib" width='350' height={126}/>
                    <Link href="/dashboard/events">
                        <Image src="/eventsWidget.svg" alt="lib" width='350' height={267}/>
                    </Link>
                    <Image src="/eventsWidget.svg" alt="lib" width='350' height={267}/>
                    <Image src="/networking.svg" alt="networking" width='350' height={267}/>
                    <Image src="/coreValues.svg" alt="networking" width='350' height={235} />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onCloseAction={() => setIsModalOpen(false)}>
                <CreateResource/>
            </Modal>
        </div>
    )
}