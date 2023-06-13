class FloatVideoComponent {
    targetElement: HTMLDivElement
    video
    muteButton
    closeButton
    isExpand
    videoIsMuted
    videoMutedOnButton
    videoState
    videoVisibleSelectState: string | null | undefined
    videoSelectState: boolean
    constructor(targetElement: string) {
        this.targetElement = document.querySelector(targetElement) as HTMLDivElement
        if (!this.targetElement) {
            throw new Error("Video container not found. Add the right HTML-structure for the video");
            return
        }
        this.video = this.targetElement.querySelector('video') as HTMLVideoElement
        this.muteButton = this.targetElement.querySelector('.float-video-controls-button--mute')
        this.closeButton = this.targetElement.querySelector('.float-video-controls-button--close')
        this.isExpand = false
        this.videoIsMuted = true
        this.videoMutedOnButton = false
        this.videoState = 'play'
        this.videoSelectState = false
        if (localStorage.getItem('video-hide') == 'true') {
            this.targetElement.classList.add('float-video-container--hide-js')
            this.targetElement.style.display = "none";
        }
        this._init()


    }
    public unmute() {
        this.muteButton?.classList.remove('float-video-controls-button--mute-active-js')
        this.video.muted = false
        this.videoIsMuted = false
    }
    public mute() {
        this.muteButton?.classList.add('float-video-controls-button--mute-active-js')
        this.video.muted = true
        this.videoIsMuted = true
        this.videoMutedOnButton = false
    }
    public expandContainer() {
        this.targetElement.classList.add('float-video-container--expand-js')
        this.isExpand = true
    }
    public rollСontainer() {
        this.targetElement.classList.remove('float-video-container--expand-js')
        this.isExpand = false
    }

    public stopVideo() {
        this.video.pause()
        this.videoState = 'pause'
        this.targetElement.classList.add('float-video-container--paused')

    }
    public playVideo() {
        this.video.play()
        this.videoState = 'play'
        this.targetElement.classList.remove('float-video-container--paused')
    }
    public hideContainer() {
        this.targetElement.classList.add('float-video-container--hide-js')
        setTimeout(() => {
            this.targetElement.style.display = "none";
            localStorage.setItem('video-hide', 'true')
        }, 300);
    }
    private _init() {
        this.video.addEventListener("click", () => {
            if (this.isExpand) {
                switch (this.videoState) {
                    case 'play':
                        console.log(this.videoState);

                        this.stopVideo()
                        break;
                    case 'pause':
                        console.log(this.videoState);

                        this.playVideo()
                        break;
                }
            } else {
                this.unmute()
            }
        });
        this.targetElement.addEventListener('click', () => {
            if (!this.isExpand) {
                this.expandContainer()
            }
        })
        this.closeButton?.addEventListener('click', (e) => {
            e.stopPropagation()
            if (this.isExpand) {
                this.rollСontainer()
                this.mute()
            } else {
                this.hideContainer()
            }
        })
        this.muteButton?.addEventListener('click', (e) => {
            e.stopPropagation()
            if (this.videoIsMuted) {
                this.unmute()
            } else {
                this.mute()
            }
        })
        this.targetElement.addEventListener('mousedown', (e) => {
            /* mybe there add handler for drag container */
        })
    }
}


let arrr = new FloatVideoComponent('.float-video-container')