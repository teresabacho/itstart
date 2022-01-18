import React, {useCallback, useState} from "react";
import style from "./Mentors.module.scss";
import BlockTitle from "../../components/blockTitle/BlockTitle";


export function Mentors() {

    return (
        <div className={style.mainBlock}>
            <div className={style.titleWrapper}>
                <BlockTitle/>
            </div>

            <div className={style.mainBlockCont}>
                <div>
                    <p className={style.p}>
                        пройшли багато співбесід, зробили безліч помилок за вас, про які їх ніхто не попереджав, тому
                        тепер
                        точно знають:
                    </p>
                </div>

                <div className={style.blocksCont}>
                    <div>
                        <p>які навики найбільше цінуються на компаніях.</p>
                        <span>На жаль, про них майже ніхто не розказує, тому це буде наш маленький секрет, якщо ви звісно пообіцяєте тримати його в таємниці  </span>
                    </div>
                    <div>
                        <p>на чому більше потрібно акцентувати увагу,
                            а що можна пройти доволі поверхнево</p>
                    </div>
                    <div>
                        <p>які навики найбільше цінуються на компаніях.</p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Mentors;