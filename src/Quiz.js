import Carousel from "react-material-ui-carousel";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import Question from "./Question";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useState } from "react";

const Quiz = () => {
    const quizQuestions = [
        {
            question: "What is the primary goal of a firewall in cybersecurity?",
            options: ["To speed up the internet", "To block unauthorized access", "To cool down the computer", "To manage software updates"],
            correctAnswer: "To block unauthorized access"
        },
        {
            question: "Which of the following is a strong password?",
            options: ["password123", "qwerty", "Abc!123$%xY", "123456"],
            correctAnswer: "Abc!123$%xY"
        },
        {
            question: "What does 'phishing' refer to in cybersecurity?",
            options: [
                "Fishing with a phishing rod",
                "A type of email scam",
                "A computer virus",
                "A method of encrypting data"
            ],
            correctAnswer: "A type of email scam"
        },
        {
            question: "What is Two-Factor Authentication (2FA)?",
            options: [
                "Using two passwords for login",
                "A backup system for lost passwords",
                "A method requiring two forms of verification",
                "An advanced encryption technique"
            ],
            correctAnswer: "A method requiring two forms of verification"
        },
        {
            question: "Which of the following is a common sign of a phishing email?",
            options: [
                "Well-written content and personal greetings",
                "Emails from known contacts only",
                "Urgency to click a link or open an attachment",
                "Emails with company logos and signatures"
            ],
            correctAnswer: "Urgency to click a link or open an attachment"
        },
        {
            question: "What does 'malware' stand for?",
            options: [
                "Multiple Access Location",
                "Malicious Software",
                "Manual Alert Response",
                "Mainframe Lock Alert"
            ],
            correctAnswer: "Malicious Software"
        },
        {
            question: "What is the purpose of encryption in cybersecurity?",
            options: [
                "To speed up data transfer",
                "To scramble data to protect it from unauthorized access",
                "To make data readable to everyone",
                "To compress files for storage"
            ],
            correctAnswer: "To scramble data to protect it from unauthorized access"
        },
        {
            question: "Which protocol is used for secure web browsing?",
            options: [
                "HTTP",
                "FTP",
                "HTTPS",
                "SMTP"
            ],
            correctAnswer: "HTTPS"
        },
        {
            question: "What is a VPN used for?",
            options: [
                "Increasing internet speed",
                "Creating a secure connection over a public network",
                "Downloading files quickly",
                "Watching videos online"
            ],
            correctAnswer: "Creating a secure connection over a public network"
        },
        {
            question: "What should you do if you suspect a device is infected with malware?",
            options: [
                "Ignore the issue and continue using the device",
                "Run a trusted antivirus or antimalware program",
                "Uninstall all software on the device",
                "Turn off the device and leave it alone"
            ],
            correctAnswer: "Run a trusted antivirus or antimalware program"
        }
    ];


    const [score, setScore] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    const handleAnswerSelected = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }

        if (activeStep < quizQuestions.length - 1) {
            setActiveStep(prevStep => prevStep + 1);
        } else {
            setIsQuizCompleted(true);
        }
    };

    const feedbacks = [
        {
            minPercentage: 90,
            color: 'green',
            icon: <CheckCircleIcon style={{ marginRight: 8 }} />,
            message: 'Excellent - You are very cybersecure!'
        },
        {
            minPercentage: 75,
            color: 'blue',
            icon: <SentimentVerySatisfiedIcon style={{ marginRight: 8 }} />,
            message: 'Very Good - You have a strong understanding of cybersecurity.'
        },
        {
            minPercentage: 50,
            color: 'orange',
            icon: <SentimentSatisfiedIcon style={{ marginRight: 8 }} />,
            message: 'Good - You have a fair understanding of cybersecurity.'
        },
        {
            minPercentage: 25,
            color: 'orange',
            icon: <WarningIcon style={{ marginRight: 8 }} />,
            message: 'Average - Your cybersecurity awareness could be improved.'
        },
        {
            minPercentage: 0,
            color: 'red',
            icon: <ErrorIcon style={{ marginRight: 8 }} />,
            message: 'Poor - You need to work on your cybersecurity knowledge.'
        }
    ];


    const getFeedback = () => {
        const percentage = (score / quizQuestions.length) * 100;
        const feedback = feedbacks.find(({ minPercentage }) => percentage >= minPercentage);

        return (
            <div style={{ display: 'flex', alignItems: 'center', color: feedback.color }}>
                {feedback.icon}
                <Typography variant="body1">{feedback.message}</Typography>
            </div>
        );
    };



    const restartQuiz = () => {
        setScore(0);
        setActiveStep(0);
        setIsQuizCompleted(false);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 2, margin: 2, maxWidth: 800, width: '100%'}}>
                <Box sx={{ padding: 2 }}>
                    {isQuizCompleted ? (
                        <Box textAlign="center">
                            <Typography variant="h4" gutterBottom>
                                Quiz Completed!
                            </Typography>
                            <Typography variant="h6">
                                Your Score: {score} out of {quizQuestions.length}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Feedback: {getFeedback()}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={restartQuiz} sx={{ marginTop: 2 }}>
                                Restart Quiz
                            </Button>
                        </Box>
                    ) : (
                        <Carousel
                            index={activeStep}
                            autoPlay={false}
                            animation="slide"
                            indicators={false}
                            navButtonsAlwaysInvisible
                        >
                            {quizQuestions.map((question, index) => (
                                <Question
                                    key={index}
                                    question={question.question}
                                    answers={question.options}
                                    correctAnswer={question.correctAnswer}
                                    onAnswerSelected={(answer) =>
                                        handleAnswerSelected(answer, question.correctAnswer)
                                    }
                                />
                            ))}
                        </Carousel>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default Quiz;