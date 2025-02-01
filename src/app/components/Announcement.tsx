import {Announcement} from "@prisma/client";
import Image from "next/image";

const imageBaseUrl = `${process.env.NEXT_PUBLIC_BLOB}`
export default function AnnouncementCard({Announcement}: {Announcement: Announcement}) {
    const imgUrl = imageBaseUrl;
   return (
       <div>
          {Announcement.title}
           <Image src={`${imageBaseUrl}/announcement-images/${Announcement.imageName}`}
                  alt=""
           width="300"
           height="200"/>
       </div>
   )
}