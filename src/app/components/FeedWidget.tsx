'use client'
import widgetStyles from './widgets.module.css'
import {useState, useEffect} from "react";
import {Resource} from "@prisma/client";
import axios from "axios";
import FeedItem from "@/app/components/FeedItem";

export default function FeedWidget() {
    const [feedItems, setFeedItems] = useState<Resource[]>([])

    const getResources = () => {
        axios.get("/api/library?limit=5")
            .then((response)=> {
                setFeedItems(response.data);
            })
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        getResources();
    }, []);
    return (
        <div className={widgetStyles.feedContainer}>
            <div className={widgetStyles.feedContent}>
                {feedItems.map((f)=> {
                    return (
                        <FeedItem Resource={f} key={f.id}/>
                    )
                })}
            </div>
        </div>
    )
}