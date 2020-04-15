const modelParams = {
    flipHorizontal: true, // flip e.g for video 
    imageScaleFactor: 0.7, // reduce input image size for gains in speed.
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.79, // confidence threshold for predictions.
};

navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

//SELECT EVERYTHING FROM HTML

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
let model;

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({
                    video: {}
                }, stream => {
                    video.srcObject = stream;
                    //Run our detection
                    setInterval(runDetection, 300);
                },
                err => console.log(err)
            );
        }
    });

function runDetection() {
    model.detect(video).then(predictions => {
        if (predictions.length !== 0) {
            let handl = predictions[0].bbox;
            let x = handl[0];
            let y = handl[1];

            if (y > 300) {
                if (x < 200) {
                    audio.src = 'piano-f.mp3';
                } else if (x > 400) {
                    audio.src = 'piano-g.mp3';
                } else if (x > 300) {
                    audio.src = 'piano-c.mp3';
                } else if (x > 200) {
                    audio.src = 'piano-am.mp3';
                }
            }
            //Play The sound
            audio.play();
        }
    });
}

handTrack.load(modelParams)
    .then(lmodel => {
        model = lmodel;
    });