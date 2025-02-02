import dashStyle from './page.module.css'
import Image from "next/image";
export default function DashboardPage() {
    return (
        <div className={dashStyle.dashContent}>
            <div className={dashStyle.dashGrid}>
                <div className={dashStyle.dashCol}>
                    <Image src="/connectWidget.svg" alt="connections" width='665' height={425} />
                    <Image src="/feed.svg" alt="feed" width='665' height={425} />
                </div>
                <div className={dashStyle.dashCol}>
                    <Image src="/aiWidget.svg" alt="ai" width='350' height={140} />
                    <Image src="/gameStatus.svg" alt="game status" width='350' height={267} />
                    <Image src="/anmntsWidget.svg" alt="ai" width='350' height={270} />
                    <Image src="/libWidget.svg" alt="lib" width='350' height={126} />
                </div>
                <div className={dashStyle.dashCol}>
                    <Image src="/wrapUp.svg" alt="lib" width='350' height={126} />
                    <Image src="/eventsWidget.svg" alt="lib" width='350' height={267} />
                    <Image src="/networking.svg" alt="networking" width='350' height={267} />
                    <Image src="/coreValues.svg" alt="networking" width='350' height={235} />
                </div>
            </div>
        </div>
    )
}