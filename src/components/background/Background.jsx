import React from "react";
import style from "./Background.module.scss";

class GradientAnimation {
    constructor() {
        this.cnv = document.querySelector('canvas');
        this.ctx = this.cnv.getContext(`2d`);

        this.n = 5;
        this.speed = .02;
        this.minRad = 400;
        this.maxRad = 600;

        this.setCanvasSize();
        this.createCircles();
        this.drawAnimation();

        window.onresize = () => {
            this.setCanvasSize();
            this.createCircles();
            this.drawAnimation();
        }
    }

    setCanvasSize() {
        // eslint-disable-next-line no-restricted-globals
        this.w = this.cnv.width = innerWidth;
        // eslint-disable-next-line no-restricted-globals
        this.h = this.cnv.height = innerHeight;
    }

    createCircles() {
        this.circles = [];
        for (let i = 0; i < this.n; ++i) {
            this.circles.push(new Circle(this.w, this.h, this.minRad, this.maxRad));
        }
    }

    drawCircles() {
        this.circles.map(circle => circle.draw(this.ctx, this.speed));
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }

    drawAnimation() {
        this.clearCanvas();
        this.drawCircles();
        window.requestAnimationFrame(() => this.drawAnimation())
    }
}

class Circle {
    constructor(w, h, minR, maxR) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.angle = Math.random() * 2 * Math.PI;
        // this.radius = Math.random() * (maxR - minR) + minR;
        // // this.firstColor = `rgb(${179}, ${251}, ${216}, ${0.42})`;
        // this.firstColor = `hls(159, 89, 84, ${0.42})`;
        // // this.secondColor = `rgb(${90}, ${169}, ${212}, ${1})`;
        // this.secondColor = `hls(201, 59, 59, ${0.42})`;

        this.radius = Math.random() * (maxR - minR) + minR;
        this.firstColor = `rgba(179, 251, 216, 0.51)`;
        this.secondColor = `rgba(90, 169, 212, 1)`;
    }

    draw(ctx, speed) {
        this.angle += speed;
        const x = this.x + Math.cos(this.angle) * 200;
        const y = this.y + Math.sin(this.angle) * 200;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
        gradient.addColorStop(0, this.firstColor);
        gradient.addColorStop(1, this.secondColor);
        ctx.filter = `blur(200px)`;

        // filter: blur(289px);

        ctx.globalCompositeOperation = `overlay`;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        // ctx.beginPath();
        // ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        // ctx.fill();
    }
}

window.onload = () => {
    new GradientAnimation();
}

export function Background() {

    return (
        <div className={style.bg}>
            <canvas></canvas>
        </div>
    )
}

export default Background;