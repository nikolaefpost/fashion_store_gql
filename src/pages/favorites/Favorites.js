import React from 'react';
import {useLanguage} from "../../context/setting";
import {useNavigate} from "react-router-dom";

import styles from "./favorites.module.scss"
import {useQuery} from "@apollo/client";
import {GET_USER_LOCAL} from "../../appolo/operations/user/userGrapfQgl";
import {recentlyWatchedSave} from "../../helpers/recentlyWatchedSave";
import OtherImage from "../product/OtherImage";
import NavBlock from "../../componets/navBlock/NavBlock";
import {useMediaQuery} from "../../helpers/useMediaQuery";



const Favorites = () => {
    const isMobile = useMediaQuery(500);
    const styleX = isMobile? {width: "165px", height: "326px"} : {width: "370px", height: "501px"};
    const {text} = useLanguage();
    const navigate = useNavigate();
    const {data: user} = useQuery(GET_USER_LOCAL);

    const handleTransition = (id) => {
        recentlyWatchedSave(id);
        navigate(`/card/${id}`)
    }

    return (
        <div className={styles.content}>
            <NavBlock namePage={text.favorites}/>
            {user?.currentUser?.favorites &&
                <OtherImage
                    title={text.favorites}
                    handleTransition={handleTransition}
                    style={styleX}
                    data={user.currentUser.favorites}
                    isFavorite={true}
                />
            }
        </div>
    );
};

export default Favorites;