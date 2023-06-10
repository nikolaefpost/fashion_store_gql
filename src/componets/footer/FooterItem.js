import React, {useEffect, useState} from 'react';
import styles from "./footer.module.scss";
import {Link} from "react-router-dom";
import {AiOutlineRight} from "react-icons/ai";
import cn from "classnames";
import {useMediaQuery} from "../../helpers/useMediaQuery";
import { motion } from "framer-motion";

const variants = {
    open: {
        height: 'auto',
        transition: {
            y: { stiffness: 1000, velocity: -100, mass: 5 },
            delay: 0.3
        }
    },
    closed: {
        height: 26,
        transition: {
            y: { stiffness: 1000},
            delay: 1.3
        }
    }
};

const childVariants = {
    open: {
        opacity: 1,
        x: 0
    },
    closed: {
        opacity: 0,
        x: -250
    }
};

const FooterItem = ({item}) => {
    const isMobile = useMediaQuery(500);
    const [isOpen, setIsOpen] = useState(false)

    const handleHideBlock = () => {
        if (isMobile) setIsOpen(pre => !pre)
    }

    useEffect(()=>{
        !isMobile? setIsOpen(true): setIsOpen(false)
    },[isMobile])
    return (
        <motion.div
            className={styles.block}
            onClick={handleHideBlock}
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            transition={{ease: 'easeOut'}}
        >
            <h3>{item.title}</h3>
            {isMobile && <span
                className={cn(styles.svg, {[styles.active_svg]: isOpen})}

            >
                        <AiOutlineRight/>
                    </span>
            }
            {item.links.map((links, i) => (
                <motion.span
                    key={links.href}
                    animate={isOpen ? 'open' : 'closed'}
                    variants={childVariants}
                    transition={{ delay: .7+i*.2, ease: 'easeOut'}}
                    className={styles.links}
                >
                    <Link key={links.href} to={links.href}>{links.name}</Link>
            </motion.span>

            ))}
        </motion.div>
    );
};

export default FooterItem;