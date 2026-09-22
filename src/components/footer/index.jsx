import {
    FiCodepen,
    FiCoffee,
    FiFacebook,
    FiGithub,
    FiGlobe,
    FiHeart,
    FiLinkedin,
    FiMail,
    FiYoutube,
} from "react-icons/fi";

import { FaPatreon } from "react-icons/fa";

import styles from "./styles.module.scss";

const links = [
    {
        label: "Portfolio",
        href: "https://www.ashishranjan.net",
        icon: <FiGlobe aria-hidden="true" />,
    },
    {
        label: "GitHub",
        href: "https://github.com/a2rp",
        icon: <FiGithub aria-hidden="true" />,
    },
    {
        label: "CodePen",
        href: "https://codepen.io/ash1198",
        icon: <FiCodepen aria-hidden="true" />,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aashishranjan",
        icon: <FiLinkedin aria-hidden="true" />,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/theash.ashish",
        icon: <FiFacebook aria-hidden="true" />,
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/channel/UCLHIBQeFQIxmRveVAjLvlbQ",
        icon: <FiYoutube aria-hidden="true" />,
    },
    {
        label: "Email",
        href: "mailto:ash.ranjan09@gmail.com",
        icon: <FiMail aria-hidden="true" />,
    },
    {
        label: "Support",
        href: "https://a2rp-donation-page.netlify.app/",
        icon: <FiHeart aria-hidden="true" />,
    },
    {
        label: "Buy Me a Coffee",
        href: "https://buymeacoffee.com/a2rp",
        icon: <FiCoffee aria-hidden="true" />,
    },
    {
        label: "Patreon",
        href: "https://www.patreon.com/a2rp",
        icon: <FaPatreon aria-hidden="true" />,
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <img
                            className={styles.logo}
                            src={`${import.meta.env.BASE_URL}logo.png`}
                            alt="Virtual Piano UI logo"
                        />

                        <div>
                            <h2 className={styles.title}>Virtual Piano UI</h2>

                            <p className={styles.text}>
                                Play, record, replay, and save note patterns
                                directly in your browser.
                            </p>
                        </div>
                    </div>

                    <nav className={styles.links} aria-label="External links">
                        {links.map(({ label, href, icon }) => {
                            const isEmail = href.startsWith("mailto:");

                            return (
                                <a
                                    key={label}
                                    className={styles.iconLink}
                                    href={href}
                                    target={isEmail ? undefined : "_blank"}
                                    rel={
                                        isEmail
                                            ? undefined
                                            : "noopener noreferrer"
                                    }
                                    aria-label={label}
                                    title={label}
                                >
                                    {icon}
                                </a>
                            );
                        })}
                    </nav>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        Copyright &copy; {currentYear}{" "}
                        <a
                            href="https://www.ashishranjan.net/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ashish Ranjan
                        </a>
                    </p>

                    <p className={styles.note}>
                        Built for interactive music practice.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
