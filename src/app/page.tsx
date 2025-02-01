'use client'

import styles from "./page.module.css";
import {useState, useEffect} from "react";
import {Announcement, Post} from "@prisma/client";
import axios from "axios";
import AnnouncementCard from "@/app/components/Announcement";
import CreateAnnouncement from "@/app/components/CreateAnnouncement";
import CreatePost from "@/app/components/CreatePost";
import PostCard from "@/app/components/PostCard";


export default function Home() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const getAnnouncements = () => {
        axios.get("/api/announcements")
        .then((response) => {
            setAnnouncements(response.data);
        })
            .catch((e)=> console.log(e));
    }

    const getPosts = () => {
        axios.get("/api/posts")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((e)=> console.log(e));
    }
    useEffect(() => {
        getAnnouncements();
        getPosts();
    }, []);

  return (
   <div>
       <CreateAnnouncement/>
       <CreatePost/>
       {announcements.map((a)  => {
           return (
               <AnnouncementCard Announcement={a} key={a.id}/>
           )

       })}
       {posts.map((p)  => {
           return (
               <PostCard Post={p}/>
           )
       })}

   </div>
  );
}
