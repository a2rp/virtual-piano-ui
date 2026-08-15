import {
    FiCodepen,
    FiCoffee,
    FiExternalLink,
    FiFacebook,
    FiGithub,
    FiGlobe,
    FiHeart,
    FiLinkedin,
    FiMail,
    FiYoutube,
} from "react-icons/fi";

import { FOOTER_LINKS } from "../../data/footerLinks";

import styles from "./styles.module.scss";

const FOOTER_ICONS = {
    Portfolio: FiGlobe,
    GitHub: FiGithub,
    CodePen: FiCodepen,
    LinkedIn: FiLinkedin,
    Facebook: FiFacebook,
    YouTube: FiYoutube,
    Support: FiHeart,
    "Buy Me A Coffee": FiCoffee,
    Patreon: FiExternalLink,
    Email: FiMail,
};

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.brand}>
                <span className={styles.label}>Created by</span>

                <a
                    href="https://www.ashishranjan.net"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.name}
                >
                    Ashish Ranjan
                </a>

                <p className={styles.text}>
                    A polished virtual piano experience with interactive notes,
                    saved playback, theme memory, and a responsive keyboard UI.
                </p>
            </div>

            <div className={styles.links}>
                {FOOTER_LINKS.map((link) => {
                    const Icon = FOOTER_ICONS[link.label] || FiExternalLink;
                    const isEmail = link.href.startsWith("mailto:");

                    return (
                        <a
                            key={link.label}
                            href={link.href}
                            target={isEmail ? "_self" : "_blank"}
                            rel={isEmail ? undefined : "noreferrer"}
                        >
                            <Icon />
                            <span>{link.label}</span>
                        </a>
                    );
                })}
            </div>
        </footer>
    );
};

export default Footer;
