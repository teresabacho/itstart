import React, {useCallback, useState} from "react";


export function Rectangles() {

    return (
        <div>
            {/*viewBox="0 0 100% 200"*/}
            <svg width="100%" height="200"  fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="130" width="100%" height="80" fill="white"/>

                <rect x="0" y="76" width="15%" height="134" fill="white"/>
                <rect x="15%" y="28" width="22%" height="182" fill="white"/>
                <rect x="37%" y="91" width="25%" height="119" fill="white"/>
                <rect x="61%" width="12%" height="200" fill="white"/>
                <rect x="72%" y="76" width="13%" height="134" fill="white"/>
                <rect x="85%" y="28" width="12%" height="232" fill="white"/>
            </svg>
        </div>
    )
}

export default Rectangles;