import {Post} from "@prisma/client";
import Image from "next/image";

const imageBaseUrl = `${process.env.NEXT_PUBLIC_BLOB}`
export default function PostCard({Post}: {Post: Post}) {
    return (
        <div>
            <h1>{Post.title}</h1>
            <div>
                {Post.images.map((image) => (
                    <Image src={`${imageBaseUrl}/posts/${image}`}
                           alt=""
                           width="300"
                           height="200"/>
                ))}
            </div>
        </div>
    )
}