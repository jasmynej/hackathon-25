'use client'

import Image from "next/image";
import styles from "./page.module.css";
import {useState, useEffect} from "react";
import {Announcement} from "@prisma/client";
import axios from "axios";
import AnnouncementCard from "@/app/components/Announcement";


export default function Home() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

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
   <div>
       {announcements.map((a)  => {
           return (
               <AnnouncementCard Announcement={a}/>
           )

       })}
   </div>
  );
}
