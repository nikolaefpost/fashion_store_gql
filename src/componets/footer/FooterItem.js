import React, {useEffect, useState} from 'react';
import styles from "./footer.module.scss";
import {Link} from "react-router-dom";
import {AiOutlineRight} from "react-icons/ai";
import cn from "classnames";
import {useMediaQuery} from "../../helpers/useMediaQuery";

const FooterItem = ({item}) => {
    const isMobile = useMediaQuery(500);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        !isMobile? setIsOpen(true): setIsOpen(false)
    },[isMobile])
    return (
        <div  className={styles.block}>
            <h3>{item.title}</h3>
            {isMobile && <span
                className={cn(styles.svg, {[styles.active_svg]: isOpen})}
                onClick={() => setIsOpen(pre => !pre)}
            >
                        <AiOutlineRight/>
                    </span>
            }
            {isOpen && item.links.map(links => (
                <Link key={links.href} to={links.href}>{links.name}</Link>
            ))}
        </div>
    );
};

export default FooterItem;