import { faker } from '@faker-js/faker';
import {Resource} from "@prisma/client";
import itemStyles from './items.module.css'
export default function FeedItem({Resource}: {Resource: Resource}) {
    return (
        <div className={itemStyles.feedItem}>

            <p><span>{faker.person.firstName()} {faker.person.lastName()} shared </span> {Resource.title}</p>
            <div className={itemStyles.itemType}>{Resource.type.toLocaleLowerCase()}</div>
        </div>
    )
}