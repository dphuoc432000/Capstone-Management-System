import React from 'react';
import RoundedAvatar from '../RoundedAvatar/RoundedAvatar.component';
import styles from './ItemImage.module.scss';

function ItemImage({ src, title, content, style }) {
    return (
        <div className={styles["item-image"] + " d-flex align-items-center mb-2"}>
            <div className="mr-3">
                <RoundedAvatar src={src} name={title} style={{ ...style, width: "35px", height: "35px", fontSize: "16px" }} />
            </div>
            <div>
                <div className={styles["item-image_title"]}>{title}</div>
                <div className={styles["item-image_content"] + " light-text"}>{content}</div>
            </div>
        </div>
    );
}

export default ItemImage;