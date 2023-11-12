import { useEffect, useState } from "react";

const WaitingForMessage = () => {

    const [dots, setDots] = useState<string>('.');

    useEffect(() => {
        const interval = setInterval(() => {
            if (dots.length < 6) {
                setDots(previousDots => previousDots + '.');
            } else {
                setDots('');
            }
        }, 150);
        return () => clearInterval(interval);
    }, [dots]);

    return (
        <article className="message">
            <div className="container">
                <div className="avatar"></div>
                <div className="content">{dots}</div>
            </div>
        </article>
    )
}

export default WaitingForMessage