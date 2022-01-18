import React, {useCallback, useState} from "react";
import style from "./Goal.module.scss";
import BlockTitle from "../../components/blockTitle/BlockTitle";
import CourseButton from "../../components/courseButton/CourseButton";

import photo from "../../assets/images/withTablychka11.svg";
import textR from "../../assets/images/textRight.svg";
import personL from "../../assets/images/personLeft.svg";

export function Goal() {
    return (
        <div className={style.mainBlock}>
            <BlockTitle/>

            <div className={style.mainBlockCont}>

                <div className={style.upperBox}>
                    <div className={style.upperBoxLeft}>
                        <p className={style.p1}>нам набридло бачити на просторах інтернету <br/>
                            <span>неефективні</span> курси, які
                            “гарантовано” забезпечують <br/>
                            працевлаштування після їх проходження, тому ми <br/> вирішили створити те, що
                            справді <span>варте уваги</span>.</p>

                        <p className={style.p2}> Якщо ви стикаєтеся з <span>тими ж проблемами</span>, що і
                            всі <br/> новачки:</p>

                        <ul>
                            <li>З чого стартувати?</li>
                            <li>Який напрям вибрати, щоб було цікаво?</li>
                            <li>Як ефективно вчитися і поєднувати це з роботою/навчанням?</li>
                            <li>Як знайти портібну вакансію?</li>
                            <li>Як перейти до практики і перестати боятись помилок?</li>
                        </ul>
                    </div>

                    <div className={style.upperBoxRightImg}>
                        <img src={photo} alt="Person right" className={style.person}/>
                        <img src={textR} alt="textOn" className={style.txt}/>
                    </div>
                </div>

                <div className={style.downBox}>
                    <div className={style.downBoxRight}>
                        <p className={style.p3}>
                            На <span>ITStart</span> вам допоможуть переконатися в тому, <br/> що незважаючи на всі
                            страхи і
                            сумніви,
                            <span> кожен <br/> здатний</span> реазуватися в IT.
                        </p>

                        <p className={style.p4}>
                            Головне - мати <span>інтерес до сфери</span> і чітке бачення, <br/> куди йти.
                        </p>

                        <p className={style.p5}>
                            Перше у вас вже є, а друге ви <span>отримаєте на <br/> курсах.</span>
                        </p>
                    </div>

                    <div className={style.btn}>
                        <CourseButton/>
                    </div>

                    <div className={style.downBoxLeftImg}>
                        <img src={personL} alt="Person right" className={style.personL}/>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Goal;