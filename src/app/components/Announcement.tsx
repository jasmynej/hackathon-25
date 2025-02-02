'use client'
import {Announcement} from "@prisma/client";
import itemStyles from './items.module.css'
import Image from "next/image";
import {useState} from "react";
import Modal from "@/app/components/Modal";

const imageBaseUrl = `${process.env.NEXT_PUBLIC_BLOB}`
export default function AnnouncementCard({Announcement}: {Announcement: Announcement}) {
    const imgUrl = imageBaseUrl;
    const [isModalOpen, setIsModalOpen] = useState(false);
   return (
       <div className={itemStyles.feedItem} onClick={() => setIsModalOpen(true)}>
          {Announcement.title}

           <Modal isOpen={isModalOpen} onCloseAction={() => setIsModalOpen(false)}>

                <h1>{Announcement.title}</h1>
                <p>{Announcement.content}</p>
               <button onClick={() => setIsModalOpen(false)}>Close</button>
           </Modal>
       </div>


   )
}