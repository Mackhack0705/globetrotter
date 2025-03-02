"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";

export default function Home() {
    const [destination, setDestination] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [showConfetti, setShowConfetti] = useState(false);

    const fetchRandomDestination = async () => {
        const response = await axios.get("http://localhost:3000/api/randomDestination");
        setDestination(response.data);
        setIsCorrect(null);
        setShowConfetti(false);
    };

    useEffect(() => {
        fetchRandomDestination();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("/api/check-answer", {
            city: destination.city,
            userAnswer,
        });
        setIsCorrect(response.data.isCorrect);
        setShowConfetti(response.data.isCorrect);

        if (response.data.isCorrect) {
            setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
        } else {
            setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Globetrotter Challenge</h1>
            {destination && (
                <div>
                    <h2>Guess the Destination!</h2>
                    <p>{destination.clues[0]}</p>
                    <p>{destination.clues[1]}</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter your guess"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            style={{ padding: "5px", marginRight: "10px" }}
                        />
                        <button type="submit" style={{ padding: "5px 10px" }}>Submit</button>
                    </form>
                    {isCorrect !== null && (
                        <div>
                            {isCorrect ? (
                                <>
                                    <p>🎉 Correct! Here&apos;s a fun fact: {destination.fun_fact[0]}</p>
                                    {showConfetti && <Confetti />}
                                </>
                            ) : (
                                <p>😢 Incorrect! Here&apos;s a fun fact: {destination.fun_fact[0]}</p>
                            )}
                        </div>
                    )}
                    <button onClick={fetchRandomDestination} style={{ marginTop: "10px", padding: "5px 10px" }}>
                        Next Destination
                    </button>
                </div>
            )}
            <div style={{ marginTop: "20px" }}>
                <h3>Score</h3>
                <p>Correct: {score.correct}</p>
                <p>Incorrect: {score.incorrect}</p>
            </div>
        </div>
    );
}