import React, {useCallback, useState} from "react";
import "./LearningProc.scss";
import BlockTitle from "../../components/blockTitle/BlockTitle";

// Character component
const Character = ({animation}) => {
    const characterClass = `character -${animation}`;
    return (
        <svg className={characterClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
            <circle className="character__eye -eye-r" cx="87.59" cy="134.46" r="5.12"/>
            <g id="body">
                <circle className="character__body -part-1" cx="140.71" cy="122.62" r="42.88"/>
                <circle className="character__body -part-2" cx="166.95" cy="141.82" r="42.88"/>
                <circle className="character__body -part-3" cx="191.26" cy="173.82" r="42.88"/>
                <circle className="character__body" cx="197.02" cy="335.1" r="42.88"/>
                <circle className="character__body" cx="197.02" cy="295.42" r="42.88"/>
                <circle className="character__body" cx="206.62" cy="216.06" r="42.88"/>
                <circle className="character__body" cx="205.98" cy="258.94" r="42.88"/>
            </g>
            <circle className="character__eye -eye-l-extra" cx="87.59" cy="134.46" r="5.12"/>
            <circle className="character__eye -eye-l" cx="115.11" cy="134.46" r="5.12"/>
        </svg>
    );
};

// Left arm component
const ArmLeft = ({animation, armPath}) => (
    <svg className="arm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
        {animation === 'typing' && <path className="arm-typing-left" d={armPath}/>}
        {animation === 'stressed' && <path className="arm-typing-left" d={armPath}/>}
        {animation === 'waiting' && <path d="M175.27,152.06s55.19,87.24-65.77,74.44"/>}
        {animation === 'thinking' && <path d="M175.93,152.78s-10.18,82-36.43,103.72"/>}
        {animation === 'passive' && <path d="M175.93,152.78s-10.18,82-36.43,103.72"/>}
        {animation === 'sleeping' && <path d="M175.93,152.78s-10.18,82-36.43,103.72"/>}
    </svg>
);

// Right arm component
const ArmRight = ({animation, armPath}) => (
    <svg className="arm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
        {animation === 'typing' && <path className="arm-typing-right" d={armPath}/>}
        {animation === 'stressed' && <path className="arm-typing-right" d={armPath}/>}
        {animation === 'waiting' && <path d="M207.26,171.26s45.19,85-75.76,72.24"/>}
        {animation === 'thinking' && <path className="arm-thinking-right" d="M207.48,172.34s-76,114.16-93-9.84"/>}
        {animation === 'passive' && <path d="M207.93,172c.57-.48,11.3,86.45-23.43,112.52"/>}
        {animation === 'sleeping' && <path d="M207.93,172c.57-.48,11.3,86.45-23.43,112.52"/>}
    </svg>
);

// Computer component
const Computer = ({animation}) => {
    const computerClass = `computer -${animation}`;
    return (
        <svg className={computerClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 55">
            <polygon className="computer__keyboard" points="29,42.5 81,51.5 45,55.5 30,49.5 "/>
            <path className="computer__keyboard" d="M80.3,55.5H45.7c-0.9,0-1.7-0.7-1.7-1.7v-0.7c0-0.9,0.7-1.7,1.7-1.7h34.7c0.9,0,1.7,0.7,1.7,1.7v0.7
        C82,54.8,81.2,55.5,80.3,55.5z"/>
            <path className="computer__screen" d="M38.9,55.4l-27.3-6.3c-1.6-0.4-2.8-1.6-3.1-3.2l-8.4-41C-0.5,2.2,1.7-0.2,4.5,0l27.4,2.5
        c1.8,0.2,3.3,1.5,3.7,3.3l8.3,44.8C44.4,53.6,41.8,56.1,38.9,55.4z"/>
        </svg>
    );
};

// Table component
const Table = () => (
    <svg className="table" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 530 160.1">
        <polygon points="530,65.8 197.7,0 0,10.6 274.9,160.1 "/>
    </svg>
);

// export function LearningProc() {
//
//     return (
//         <div className={style.mainBlock}>
//
//             <BlockTitle/>
//
//             <div className={style.mainBlockCont}>
//
//                 <p>hbds ,jhc</p>
//
//             </div>
//         </div>
//     )
// }


class LearningProc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: "sleeping",
            armPath: "M 207 171",
            frequency: 3,
            amplitude: 0.1,
            xstart: 207,
            ystart: 171,
            length: 110,
            offset: 0,
            fps: 60,
        };
        this.createCurve = this.createCurve.bind(this);
        this.setAnimation = this.setAnimation.bind(this);
        this.setConfig = this.setConfig.bind(this);
        this.updateArms = this.updateArms.bind(this);
        this.loop = this.loop.bind(this);
        this.loopref = null;
    }

    createCurve(x, offset, inverted = false) {
        const {frequency, ystart, xstart, amplitude} = this.state;
        const phase = inverted ? Math.sqrt(x * frequency) - offset : Math.sqrt(x * frequency) + offset;
        return ystart - (Math.sin(phase)) * (x - xstart) * amplitude;
    }

    updateArms() {
        const {ystart, xstart, length} = this.state;
        let x = xstart;
        let dataL = `M ${xstart} ${ystart}`;
        let dataR = `M ${xstart} ${ystart}`;

        while (x < xstart + length) {
            const newYL = this.createCurve(x, this.state.offset);
            const newYR = this.createCurve(x, this.state.offset, true);
            dataL = `${dataL} L ${x} ${newYL}`;
            dataR = `${dataR} L ${x} ${newYR}`;
            x += 1;
        }
        this.setState({
            armPathL: dataL,
            armPathR: dataR,
        })
    }

    loop() {
        const {offset, animation, fps} = this.state;
        if (animation !== "typing" && animation !== "stressed") {
            clearTimeout(this.loopRef);
            return;
        }
        this.setState({
            offset: offset + 0.3,
        })
        this.updateArms();
        this.loopRef = setTimeout(() => {
            requestAnimationFrame(this.loop);
        }, (1000 / fps));
    }

    setAnimation(newAnimation, speed) {
        this.setState({
            animation: newAnimation,
            fps: speed || 60,
        })
        if (newAnimation === "typing" || newAnimation === "stressed") {
            clearTimeout(this.loopRef);
            requestAnimationFrame(this.loop);
        }
    }

    setConfig(e) {
        const type = e.target.name;
        console.log(type);
        this.setState({
            [type]: e.target.value,
        })
    }

    render() {
        const {frequency, amplitude, animation} = this.state;
        return (
            <div className="mainBlockLearningProc">
                <BlockTitle/>

                <div className="mainBlockCont">

                    <div className="app">
                        <div className="wrapper">
                            <ArmLeft animation={this.state.animation} armPath={this.state.armPathL}/>
                            <Character animation={this.state.animation}/>
                            <ArmRight animation={this.state.animation} armPath={this.state.armPathR}/>
                            <Table/>
                            <Computer animation={this.state.animation}/>
                        </div>
                        <div className="controls">
                            <div className="stepss">
                            </div>
                            <div className=" steps step1">
                                <p>Крок 1</p>
                                <h4>Дивитесь відео</h4>
                                <button onClick={() => this.setAnimation('passive')}>
                                    <svg width="128" height="128" viewBox="0 0 128 128" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.6667 64.0001C10.6667 74.5484 13.7946 84.8599 19.6549 93.6305C25.5153 102.401 33.8448 109.237 43.5902 113.274C53.3356 117.31 64.0592 118.367 74.4048 116.309C84.7505 114.251 94.2536 109.171 101.712 101.712C109.171 94.2536 114.251 84.7506 116.309 74.4049C118.366 64.0592 117.31 53.3357 113.274 43.5903C109.237 33.8449 102.401 25.5154 93.6304 19.655C84.8598 13.7947 74.5483 10.6667 64 10.6667C56.9962 10.6667 50.0609 12.0463 43.5902 14.7265C37.1195 17.4068 31.2401 21.3353 26.2876 26.2877C16.2857 36.2897 10.6667 49.8552 10.6667 64.0001V64.0001ZM73.92 44.3201L89.1733 60.3201C89.399 60.5515 89.5799 60.8227 89.7067 61.1201C89.9331 61.371 90.1137 61.6599 90.24 61.9734C90.5222 62.6118 90.6679 63.3021 90.6679 64.0001C90.6679 64.6981 90.5222 65.3883 90.24 66.0268C89.9862 66.6814 89.6055 67.2795 89.12 67.7867L73.12 83.7868C72.1157 84.791 70.7536 85.3552 69.3333 85.3552C67.913 85.3552 66.5509 84.791 65.5467 83.7868C64.5424 82.7825 63.9782 81.4204 63.9782 80.0001C63.9782 78.5798 64.5424 77.2177 65.5467 76.2134L72.48 69.3334H42.6667C41.2522 69.3334 39.8956 68.7715 38.8954 67.7713C37.8952 66.7711 37.3333 65.4146 37.3333 64.0001C37.3333 62.5856 37.8952 61.229 38.8954 60.2288C39.8956 59.2287 41.2522 58.6667 42.6667 58.6667H72.8533L66.1867 51.6801C65.2107 50.6546 64.682 49.2834 64.717 47.8681C64.752 46.4528 65.3478 45.1094 66.3733 44.1334C67.3988 43.1574 68.77 42.6288 70.1853 42.6638C71.6006 42.6988 72.944 43.2946 73.92 44.3201V44.3201Z"
                                            fill="#B3FBD8"/>
                                    </svg>
                                </button>
                            </div>
                            <div className=" steps step2">
                                <p>Крок 2</p>
                                <h4>Кодите</h4>
                                <span>P.S. швидкість та розмах залежать від вас, тому пропонуємо вибрати параметри самостійно</span>
                                <button onClick={() => this.setAnimation('stressed', 240)}>
                                    <svg width="128" height="128" viewBox="0 0 128 128" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.6667 64.0001C10.6667 74.5484 13.7946 84.8599 19.6549 93.6305C25.5153 102.401 33.8448 109.237 43.5902 113.274C53.3356 117.31 64.0592 118.367 74.4048 116.309C84.7505 114.251 94.2536 109.171 101.712 101.712C109.171 94.2536 114.251 84.7506 116.309 74.4049C118.366 64.0592 117.31 53.3357 113.274 43.5903C109.237 33.8449 102.401 25.5154 93.6304 19.655C84.8598 13.7947 74.5483 10.6667 64 10.6667C56.9962 10.6667 50.0609 12.0463 43.5902 14.7265C37.1195 17.4068 31.2401 21.3353 26.2876 26.2877C16.2857 36.2897 10.6667 49.8552 10.6667 64.0001V64.0001ZM73.92 44.3201L89.1733 60.3201C89.399 60.5515 89.5799 60.8227 89.7067 61.1201C89.9331 61.371 90.1137 61.6599 90.24 61.9734C90.5222 62.6118 90.6679 63.3021 90.6679 64.0001C90.6679 64.6981 90.5222 65.3883 90.24 66.0268C89.9862 66.6814 89.6055 67.2795 89.12 67.7867L73.12 83.7868C72.1157 84.791 70.7536 85.3552 69.3333 85.3552C67.913 85.3552 66.5509 84.791 65.5467 83.7868C64.5424 82.7825 63.9782 81.4204 63.9782 80.0001C63.9782 78.5798 64.5424 77.2177 65.5467 76.2134L72.48 69.3334H42.6667C41.2522 69.3334 39.8956 68.7715 38.8954 67.7713C37.8952 66.7711 37.3333 65.4146 37.3333 64.0001C37.3333 62.5856 37.8952 61.229 38.8954 60.2288C39.8956 59.2287 41.2522 58.6667 42.6667 58.6667H72.8533L66.1867 51.6801C65.2107 50.6546 64.682 49.2834 64.717 47.8681C64.752 46.4528 65.3478 45.1094 66.3733 44.1334C67.3988 43.1574 68.77 42.6288 70.1853 42.6638C71.6006 42.6988 72.944 43.2946 73.92 44.3201V44.3201Z"
                                            fill="#B3FBD8"/>
                                    </svg>
                                </button>
                            </div>
                            <div className=" steps step3">
                                <p>Крок 3</p>
                                <h4>Вносите останні зміни</h4>
                                <button onClick={() => this.setAnimation('typing')}>
                                    <svg width="128" height="128" viewBox="0 0 128 128" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.6667 64.0001C10.6667 74.5484 13.7946 84.8599 19.6549 93.6305C25.5153 102.401 33.8448 109.237 43.5902 113.274C53.3356 117.31 64.0592 118.367 74.4048 116.309C84.7505 114.251 94.2536 109.171 101.712 101.712C109.171 94.2536 114.251 84.7506 116.309 74.4049C118.366 64.0592 117.31 53.3357 113.274 43.5903C109.237 33.8449 102.401 25.5154 93.6304 19.655C84.8598 13.7947 74.5483 10.6667 64 10.6667C56.9962 10.6667 50.0609 12.0463 43.5902 14.7265C37.1195 17.4068 31.2401 21.3353 26.2876 26.2877C16.2857 36.2897 10.6667 49.8552 10.6667 64.0001V64.0001ZM73.92 44.3201L89.1733 60.3201C89.399 60.5515 89.5799 60.8227 89.7067 61.1201C89.9331 61.371 90.1137 61.6599 90.24 61.9734C90.5222 62.6118 90.6679 63.3021 90.6679 64.0001C90.6679 64.6981 90.5222 65.3883 90.24 66.0268C89.9862 66.6814 89.6055 67.2795 89.12 67.7867L73.12 83.7868C72.1157 84.791 70.7536 85.3552 69.3333 85.3552C67.913 85.3552 66.5509 84.791 65.5467 83.7868C64.5424 82.7825 63.9782 81.4204 63.9782 80.0001C63.9782 78.5798 64.5424 77.2177 65.5467 76.2134L72.48 69.3334H42.6667C41.2522 69.3334 39.8956 68.7715 38.8954 67.7713C37.8952 66.7711 37.3333 65.4146 37.3333 64.0001C37.3333 62.5856 37.8952 61.229 38.8954 60.2288C39.8956 59.2287 41.2522 58.6667 42.6667 58.6667H72.8533L66.1867 51.6801C65.2107 50.6546 64.682 49.2834 64.717 47.8681C64.752 46.4528 65.3478 45.1094 66.3733 44.1334C67.3988 43.1574 68.77 42.6288 70.1853 42.6638C71.6006 42.6988 72.944 43.2946 73.92 44.3201V44.3201Z"
                                            fill="#B3FBD8"/>
                                    </svg>
                                </button>
                            </div>
                            <div className=" steps step4">
                                <p>Крок 4</p>
                                <h4>Відправляєте ментору на перевірку</h4>
                                <button onClick={() => this.setAnimation('waiting')}>
                                    <svg width="107" height="107" viewBox="0 0 107 107" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M0 53.5C0 39.3109 5.63659 25.703 15.6698 15.6698C25.703 5.6366 39.3109 7.92568e-06 53.5 7.92568e-06C67.6891 7.92568e-06 81.297 5.6366 91.3302 15.6698C101.363 25.703 107 39.3109 107 53.5C107 67.6891 101.363 81.297 91.3302 91.3302C81.297 101.363 67.6891 107 53.5 107C39.3109 107 25.703 101.363 15.6698 91.3302C5.63659 81.297 0 67.6891 0 53.5ZM50.4469 76.3982C50.4469 76.3981 50.447 76.398 50.447 76.3979L78.0898 41.8413C79.8464 39.6453 79.5296 36.4487 77.376 34.6402V34.6402C75.1196 32.7453 71.739 33.1122 69.9416 35.4471L51.0602 59.9752C50.722 60.4145 50.0911 60.4949 49.6536 60.1544L38.0081 51.0909C35.6197 49.2321 32.1986 49.5459 30.1882 51.8082V51.8082C28.0341 54.2323 28.3131 57.9581 30.8043 60.0343L50.4416 76.4007C50.4437 76.4025 50.4469 76.4009 50.4469 76.3982V76.3982Z"
                                              fill="#B3FBD8"/>
                                    </svg>

                                </button>
                            </div>
                            {/*<button onClick={() => this.setAnimation('thinking')}>Вносите останні зміни</button>*/}
                        </div>
                        {animation === 'stressed' &&
                        <div className="sliders">
                            <input
                                type="range"
                                step="0.01"
                                name="frequency"
                                value={frequency}
                                onChange={this.setConfig}
                                min="0"
                                max="10"
                            />
                            <input
                                type="range"
                                step="0.01"
                                name="amplitude"
                                value={amplitude}
                                onChange={this.setConfig}
                                min="0.05"
                                max="2"
                            />
                        </div>
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default LearningProc;