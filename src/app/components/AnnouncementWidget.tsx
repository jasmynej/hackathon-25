'use client'

import widgetStyles from './widgets.module.css'
import {useState, useEffect} from "react";
import {Announcement} from "@prisma/client";
import axios from "axios";
import AnnouncementCard from "@/app/components/Announcement";
import Modal from "@/app/components/Modal";
import CreateAnnouncement from "@/app/components/CreateAnnouncement";

export default function AnnouncementWidget () {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getAnnouncements = () => {
        axios.get("/api/announcements")
            .then((response) => {
                setAnnouncements(response.data);
            })
            .catch((e)=> console.log(e));
    }


    useEffect(() => {
        getAnnouncements();
    }, []);

    return (
        <div className={widgetStyles.announcementContainer}>
            <div onClick={() => setIsModalOpen(true)} className={widgetStyles.createBtn}>Create</div>
            <div className={widgetStyles.announcements}>

                {
                    announcements.map((a) => {
                        return (
                            <AnnouncementCard Announcement={a} key={a.id}/>
                        )
                    })
                }
            </div>
            <Modal isOpen={isModalOpen} onCloseAction={() => setIsModalOpen(false)}>
                <CreateAnnouncement/>
            </Modal>
        </div>
    )
}