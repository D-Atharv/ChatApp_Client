import { motion } from "framer-motion";

export const WelcomeMessage = ({ userName }: { userName: string }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    };

    const welcomeText = `Welcome ${userName}`.split(" ");

    return (
        <motion.div
            className="text-gray-200 font-bold text-[2.2em] flex space-x-2"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {welcomeText.map((word, index) => (
                <motion.span key={index} variants={item}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};
