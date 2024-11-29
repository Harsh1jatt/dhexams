import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./css/Rules.css";
import { ProfileContext } from "../../contexts/ProfileContext";

const Rules = () => {
    const { examInfo, setExamInfo } = useContext(ProfileContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve examInfo from localStorage if it's not in context
        const storedExamInfo = localStorage.getItem('examInfo');
        if (storedExamInfo) {
            setExamInfo(JSON.parse(storedExamInfo)); // Update context with stored value
        }
    }, [setExamInfo]);


    const handleProceed = () => {
        if (examInfo) {
            navigate("/typing");
        } else {
            navigate("/exam");
        }
    };
    return (
        <div className="rules-container">
            <ul className="rules-list">
                <li>
                    <span className="rule-icon">🕒</span>
                    Ensure that you have a stable internet connection throughout the exam.
                </li>
                <li>
                    <span className="rule-icon">⏳</span>
                    The exam duration is fixed, and the timer will not stop once the exam starts.
                </li>
                <li>
                    <span className="rule-icon">🚫</span>
                    Do not navigate away from the exam window, or your session may be terminated.
                </li>
                <li>
                    <span className="rule-icon">⚠️</span>
                    Any form of cheating or unauthorized materials will result in disqualification.
                </li>
                <li>
                    <span className="rule-icon">✍️</span>
                    Answer all questions to the best of your ability. Unanswered questions will receive zero marks.
                </li>
                <li>
                    <span className="rule-icon">🔍</span>
                    You can mark questions for review and revisit them before submitting the exam.
                </li>
                <li>
                    <span className="rule-icon">📅</span>
                    Ensure that you submit your exam before the time runs out to avoid automatic submission.
                </li>
                <li>
                    <span className="rule-icon">🤐</span>
                    Respect the exam environment: no talking or interaction with other examinees during the test.
                </li>
                <li>
                    <span className="rule-icon">💡</span>
                    Read each question carefully and manage your time wisely.
                </li>
                <li>
                    <span className="rule-icon">📞</span>
                    For any technical issues, contact the exam supervisor immediately.
                </li>
            </ul>
            <button id="proceedBtn" className="btn-proceed" onClick={handleProceed}>
                Proceed to Exam
            </button>
        </div>
    );
};

export default Rules;
