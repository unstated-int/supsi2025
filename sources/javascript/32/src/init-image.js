let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/UVldCVZ9G/";
let video;
let flippedVideo;
let _label = "";
let result = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");

}

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function draw() {
  // background(0);
  image(flippedVideo, 0, 0);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  // text(_label, width / 2, height - 4);
  result = _label;
  drawResult(result);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  _label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
