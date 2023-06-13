"use strict";
class FloatVideoComponent {
    constructor(targetElement) {
        this.targetElement = document.querySelector(targetElement);
        if (!this.targetElement) {
            throw new Error("Video container not found. Add the right HTML-structure for the video");
            return;
        }
        this.video = this.targetElement.querySelector('video');
        this.muteButton = this.targetElement.querySelector('.float-video-controls-button--mute');
        this.closeButton = this.targetElement.querySelector('.float-video-controls-button--close');
        this.isExpand = false;
        this.videoIsMuted = true;
        this.videoMutedOnButton = false;
        this.videoState = 'play';
        this.videoSelectState = false;
        if (localStorage.getItem('video-hide') == 'true') {
            this.targetElement.classList.add('float-video-container--hide-js');
            this.targetElement.style.display = "none";
        }
        this._init();
    }
    unmute() {
        var _a;
        (_a = this.muteButton) === null || _a === void 0 ? void 0 : _a.classList.remove('float-video-controls-button--mute-active-js');
        this.video.muted = false;
        this.videoIsMuted = false;
    }
    mute() {
        var _a;
        (_a = this.muteButton) === null || _a === void 0 ? void 0 : _a.classList.add('float-video-controls-button--mute-active-js');
        this.video.muted = true;
        this.videoIsMuted = true;
        this.videoMutedOnButton = false;
    }
    expandContainer() {
        this.targetElement.classList.add('float-video-container--expand-js');
        this.isExpand = true;
    }
    rollСontainer() {
        this.targetElement.classList.remove('float-video-container--expand-js');
        this.isExpand = false;
    }
    stopVideo() {
        this.video.pause();
        this.videoState = 'pause';
        this.targetElement.classList.add('float-video-container--paused');
    }
    playVideo() {
        this.video.play();
        this.videoState = 'play';
        this.targetElement.classList.remove('float-video-container--paused');
    }
    hideContainer() {
        this.targetElement.classList.add('float-video-container--hide-js');
        setTimeout(() => {
            this.targetElement.style.display = "none";
            localStorage.setItem('video-hide', 'true');
        }, 300);
    }
    _init() {
        var _a, _b;
        this.video.addEventListener("click", () => {
            if (this.isExpand) {
                switch (this.videoState) {
                    case 'play':
                        console.log(this.videoState);
                        this.stopVideo();
                        break;
                    case 'pause':
                        console.log(this.videoState);
                        this.playVideo();
                        break;
                }
            }
            else {
                this.unmute();
            }
        });
        this.targetElement.addEventListener('click', () => {
            if (!this.isExpand) {
                this.expandContainer();
            }
        });
        (_a = this.closeButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.isExpand) {
                this.rollСontainer();
                this.mute();
            }
            else {
                this.hideContainer();
            }
        });
        (_b = this.muteButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.videoIsMuted) {
                this.unmute();
            }
            else {
                this.mute();
            }
        });
        this.targetElement.addEventListener('mousedown', (e) => {
            /* mybe there add handler for drag container */
        });
    }
}
let arrr = new FloatVideoComponent('.float-video-container');
