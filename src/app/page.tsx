'use client'

import styles from "./page.module.css";
import {useState, useEffect} from "react";
import {Announcement} from "@prisma/client";
import axios from "axios";
import AnnouncementCard from "@/app/components/Announcement";
import CreateAnnouncement from "@/app/components/CreateAnnouncement";
import CreateResource from "@/app/components/CreateResource";

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
       <CreateAnnouncement/>
       <CreateResource/>
       {announcements.map((a)  => {
           return (
               <AnnouncementCard Announcement={a} key={a.id}/>
           )

       })}

   </div>
  );
}
