
import "./ChatWindow.css";
import Chat from "./chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";

import ChatWindow from "./ChatWindow.jsx";

function Navbar() {
    const { prompt, setPrompt, currThreadId, setPrevChats, setNewChat } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showThemeToggle, setShowThemeToggle] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [showVersionModal, setShowVersionModal] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
   

    const dropdownRef = useRef(null);
    const profileRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    


    const handleProfileClick = () => {
        setIsOpen(prev => !prev);
        setShowThemeToggle(false);
        setShowUpgradeModal(false);
        setShowVersionModal(false);
    };

    const handleSettingsClick = () => {
        setShowThemeToggle(true);
    };

    const handleUpgradeClick = () => {
        setShowUpgradeModal(true);
    };

    const handleVersionClick = () => {
        setShowVersionModal(true);
    };

   

    // Click outside detection
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setShowThemeToggle(false);
                setShowUpgradeModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span onClick={handleVersionClick} style={{ cursor: "pointer" }}>
                    AI ChatBOT <i className="fa-solid fa-chevron-down"></i>
                </span>
                <div className="userIconDiv" onClick={handleProfileClick} ref={profileRef}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>

            {/* Dropdown menu */}
            {isOpen && !showThemeToggle && !showUpgradeModal && (
                <div className="dropDown" ref={dropdownRef}>
                    <div className="dropDownItem" onClick={handleSettingsClick}>
                        <i className="fa-solid fa-gear"></i> Settings
                    </div>
                    <div className="dropDownItem" onClick={handleUpgradeClick}>
                        <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
                    </div>
                    <div className="dropDownItem">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                    </div>
                </div>
            )}

            {/* Theme toggle submenu */}
            {isOpen && showThemeToggle && (
                <div className="dropDown" ref={dropdownRef}>
                    <div className="dropDownItem" onClick={toggleTheme}>
                        <i className="fa-solid fa-circle-half-stroke"></i> Toggle Theme ({theme})
                    </div>
                    <div className="dropDownItem" onClick={() => setShowThemeToggle(false)}>
                        <i className="fa-solid fa-arrow-left"></i> Back
                    </div>
                </div>
            )}

            {/* Upgrade plan modal */}
            {isOpen && showUpgradeModal && (
                <div className="modalOverlay">
                    <div className="modal">
                        <h2>Upgrade Your Plan</h2>
                        <p>Unlock premium features like unlimited AI chats, faster responses, and more!</p>
                        <button
                            onClick={() => alert("You are using latest Version, New Version coming soon")}
                        >
                            Go to Upgrade
                        </button>
                        <button onClick={() => setShowUpgradeModal(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* Version modal */}
            {showVersionModal && (
                <div className="modalOverlay">
                    <div className="modal">
                        <h2>AI ChatBOT Version</h2>
                        <p>You are using latest Version: <strong>v3.0.0</strong></p>
                        <button onClick={() => setShowVersionModal(false)}>Close</button>
                    </div>
                </div>
            )}
             <>
                <ChatWindow></ChatWindow>
                </>
            </div>
           
        

    );
}

export default Navbar;
