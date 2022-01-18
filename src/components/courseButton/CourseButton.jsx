import React, {useCallback, useState} from "react";
import style from "./CourseButton.module.scss";

export function CourseButton() {

    return (
        <div>
            <button className={style.btn} type={"button"}>Вибрати курс</button>
        </div>
    )
}

export default CourseButton;