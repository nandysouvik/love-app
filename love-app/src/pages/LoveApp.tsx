import React, { useState } from "react";
import { Button } from "../components/ui/button";

const LoveApp: React.FC = () => {
    const [loveAccepted, setLoveAccepted] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const [noClickCount, setNoClickCount] = useState(0);
    const [isShaking, setIsShaking] = useState(false);
    const [heartRain, setHeartRain] = useState(false);

    const funnyMessages = [
        "Are you sure? 🥺",
        "Think again 😏",
        "Come on, just say yes! 💕",
        "You’re breaking my heart 💔",
        "Still no? I won’t give up 😎",
        "Oops... looks like 'No' left the chat 🤭",
    ];

    // 👉 Call backend API to send SMS
    const sendYesMessage = async () => {
        try {
            const res = await fetch("http://localhost:5000/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: "Yay! She said Yes! 💘" })
            });

            const data = await res.json();
            if (data.success) {
                console.log("✅ Message sent successfully!");
            } else {
                console.log("❌ " + data.error);
            }
        } catch (err) {
            console.log("⚠️ Error:", err);
        }
    };

    // Handle No button
    const handleNoClick = () => {
        setMessageIndex((prev) => (prev + 1) % funnyMessages.length);
        setIsShaking(true);

        setTimeout(() => {
            setIsShaking(false);
            setNoClickCount((prev) => prev + 1);
        }, 500);
    };

    // Random position + shrink factor for No button
    const noButtonStyle = {
        transform: `scale(${Math.max(1 - noClickCount * 0.15, 0.3)})`,
        position: noClickCount > 0 ? "absolute" as const : "static" as const,
        top: noClickCount > 0 ? `${Math.random() * 70 + 10}%` : "auto",
        left: noClickCount > 0 ? `${Math.random() * 70 + 10}%` : "auto",
        transition: "all 0.4s ease",
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-600 to-pink-700 text-white relative overflow-hidden">
            {/* ❤️ Falling hearts */}
            {heartRain && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {[...Array(30)].map((_, i) => (
                        <span
                            key={i}
                            className="falling-heart"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${3 + Math.random() * 5}s`,
                                animationDelay: `${Math.random() * 5}s`,
                                fontSize: `${Math.random() * 20 + 14}px`,
                            }}
                        >
                            ❤️
                        </span>
                    ))}
                </div>
            )}

            {!loveAccepted ? (
                <div className="p-8 shadow-2xl rounded-2xl text-center border z-10 relative">
                    <h1 className="text-3xl font-bold mb-6 text-pink-100">
                        Do you love me? 💖
                    </h1>

                    <div className="flex gap-4 justify-center relative">
                        <Button
                            variant="default"
                            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-lg z-10"
                            onClick={() => {
                                setLoveAccepted(true);
                                sendYesMessage();
                                setHeartRain(true);
                            }}
                        >
                            Yes 💘
                        </Button>

                        {noClickCount < 5 && (
                            <Button
                                variant="secondary"
                                className={`border-pink-300 text-pink-200 hover:bg-pink-500 hover:text-white z-10 ${isShaking ? "animate-shake" : ""
                                    }`}
                                style={noButtonStyle}
                                onClick={handleNoClick}
                            >
                                No 😢
                            </Button>
                        )}
                    </div>

                    {messageIndex > 0 && (
                        <p className="mt-6 font-medium animate-pulse text-pink-200">
                            {funnyMessages[messageIndex - 1]}
                        </p>
                    )}
                </div>
            ) : (
                <h2 className="text-4xl font-bold animate-bounce z-10 text-pink-100">
                    Yay! You said YES 💕🎉
                </h2>
            )}
        </div>
    );
};

export default LoveApp;