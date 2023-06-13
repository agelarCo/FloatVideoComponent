# Компонент плавающего видео


### Обязательная структура перед инициализацией

```
<div class="float-video-container">
    <video controls="false" autoplay muted="true" src="https://figasebe.ru/video/preview_video/t227.mp4" preload="auto" loop></video>
    <div class="float-video-inner-name">Какое-то видео</div>
    <div class="float-video-controls-buttons">
        <div class="float-video-controls-button float-video-controls-button--close"></div>
        <div class="float-video-controls-button float-video-controls-button--mute"></div>
    </div>
</div>
```

### Инициалзиция

```
let FloatVideo = new FloatVideoComponent('.float-video-container')
```