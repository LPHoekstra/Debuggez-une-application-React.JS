import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import { useData } from "../../contexts/DataContext";

const LastEvents = () => {
    const { data } = useData()
    const [last, setLast] = useState(null);

    useEffect(() => {
        if (data?.events) {
            const lastElement = data.events.sort((evtA, evtB) =>
                new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
            ).at(-1);
            setLast(lastElement)
        }
    }, [data])

    return (
        last ?
            <EventCard
                imageSrc={last.cover}
                title={last.title}
                date={new Date(last.date)}
                small
                label="boom"
            />
            :
            <p>Aucune évènement récent.</p>
    )
}

export default LastEvents