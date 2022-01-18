import React, {useCallback, useState} from "react";
import style from "./BlockTitle.module.scss";

export function BlockTitle(props) {

    return (
        <div className={style.blockTitle}>
            <h2>Ціль курсів</h2>

            <p className={style.list}>
                ціль курсів ціль курсів ціль курсів ціль курсів ціль курсів ціль курсів ціль курсів ціль курсів ціль
                курсів ціль курсів ціль курсів ціль курсів ціль курсів ціль курсів ціль курсів ціль курсів ціль курсів
                ціль курсів ціль курсів
            </p>
        </div>
    )
}

export default BlockTitle;