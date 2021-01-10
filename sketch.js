let o = 0;
let beatx = 0;
let beaty = 0;
let dur = 0;
let time = 0;
let vel = 0; //volume
// let sound = ['E3', 'F3', 'G3', 'C4', 'D4', 'F4'];
let pitch = [130.81, 164.81, 174.61, 190, 200];

//array to hold row numbers
let y0 = [0];
let y1 = [1];
let y2 = [2];
let y3 = [3];
let y4 = [4];
let y5 = [5];
let y6 = [6];

//array to identify blank column numbers in each row
let blankx0 = [3, 7, 13, 14, 15];
let blankx1 = [5, 6, 7, 13, 14, 15];
let blankx2 = [3, 7, 13, 14, 15];
let blankx3 = [5, 6, 7, 13, 14, 15];
let blankx4 = [7, 15];
let blankx5 = [4, 5, 12, 13, 14, 15];
let blankx6 = [4, 5, 12, 13, 14, 15];
//blank colors
let blankR = 195;
let blankG = 206;
let blankB = 208;

//array to identify symbol column numbers in each row
let symbolx0 = [1, 5, 10];
let symbolx1 = [2, 10];
let symbolx2 = [10];
//symbol colors
let symbolR = 192;
let symbolG = 0;
let symbolB = 64;

//array to identify ping column numbers in each row
let pingx0 = [0, 6, 11, 12];
let pingx1 = [0, 1, 11, 12];
let pingx2 = [0, 5, 6, 11, 12];
let pingx3 = [0, 1, 2, 8, 11, 12];
let pingx4 = [3, 4, 9, 10, 13, 14];
let pingx5 = [2, 3, 6, 9, 10];
let pingx6 = [1, 2, 6, 7, 10, 11];
//ping colors
let pingR = 0;
let pingG = 128;
let pingB = 255;

//array to identify rhymes
let rhymex0 = [6, 12];
let rhymex1 = [12];
let rhymex2 = [6, 12];
let rhymex3 = [12];
let rhymex4 = [14];
let rhymex6 = [11];


//ze colors - default
let zeR = 255;
let zeG = 128;
let zeB = 0;

let baseColor;
let baseR = 0,
  baseG = 90,
  baseB = 97;
let noteColor;
let noteR,
  noteG,
  noteB;
let bgR = 0,
  bgG = 20,
  bgB = 15;
let txR = 0,
  txG = 100,
  txB = 90;
let poem;
let word;
let i = 0;
let j = 0;

let started = false;

function preload() {
  poem = loadStrings('poem.txt');
}

function setup() {
  // console.log(poem);
  let cnv = createCanvas(600, 400);
  // cnv.mousePressed(playSynth);
  frameRate(30);
  monoSynth = new p5.MonoSynth();
  polySynth = new p5.PolySynth();
  osc = new p5.Oscillator();
  fft = new p5.FFT();
}

function draw() {
  //colors
  baseColor = color(baseR, baseG, baseB);
  noteColor = color(noteR, noteG, noteB);
  background(bgR, bgG, bgB);

  //title
  textFont('Courier New');
  textSize(20);
  fill(0,190,180);
  text('sound meters in chinese poetry', 20, 40);

    push();
    translate(5, height / 3);
    noStroke();
    var x = 0;
    for (let j = 0; j < 7; j++) {
      for (let i = 0; i < 16; i++) {
        if (i == beatx && j == beaty) {
          if ( i == 0 && j == 0) {
            noFill();
            stroke(baseColor);
          } else {
            fill(noteColor);         
          }
        } else {
          noFill();
          strokeWeight(1);
          stroke(baseColor);
        }
        rect(i * 37, j * 37, 36, 36);
        textAlign(CENTER, CENTER);
        textSize(25);
        noStroke();
        fill(250);
        textFont('Georgia');
        text(poem[x], i * 37 + 17, j * 37 + 17);
        x++;
        // console.log(x);
      }
    }
    pop();
  
  if (started) {
    let o = frameCount % 8
    if (o == 0) {
      // beatx = 0;
      beatx += 1;
      if (beatx == 16) {
        if (beaty == 6) {
          noLoop();
          osc.amp(0);
        }
        beatx = 0;
        beaty += 1;
      }
      //color change
    if (symbolx0.includes(beatx) && y0.includes(beaty)
        || symbolx1.includes(beatx) && y1.includes(beaty)
        || symbolx2.includes(beatx) && y2.includes(beaty)) {
      noteR = symbolR;
      noteG = symbolG;
      noteB = symbolB;
      
      playSynthZe()
    } else if (blankx0.includes(beatx) && y0.includes(beaty)
      || blankx1.includes(beatx) && y1.includes(beaty)
      || blankx2.includes(beatx) && y2.includes(beaty)
      || blankx3.includes(beatx) && y3.includes(beaty)
      || blankx4.includes(beatx) && y4.includes(beaty)
      || blankx5.includes(beatx) && y5.includes(beaty)
      || blankx6.includes(beatx) && y6.includes(beaty)) {
      noteR = blankR;
      noteG = blankG;
      noteB = blankB;
            
    } else if (pingx0.includes(beatx) && y0.includes(beaty)
      || pingx1.includes(beatx) && y1.includes(beaty)
      || pingx2.includes(beatx) && y2.includes(beaty)
      || pingx3.includes(beatx) && y3.includes(beaty)
      || pingx4.includes(beatx) && y4.includes(beaty)
      || pingx5.includes(beatx) && y5.includes(beaty)
      || pingx6.includes(beatx) && y6.includes(beaty)) {
      noteR = pingR;
      noteG = pingG;
      noteB = pingB;
      
        if (rhymex0.includes(beatx) && y0.includes(beaty)
        || rhymex1.includes(beatx) && y1.includes(beaty)
        || rhymex2.includes(beatx) && y2.includes(beaty)
        || rhymex3.includes(beatx) && y3.includes(beaty)
        || rhymex4.includes(beatx) && y4.includes(beaty)
        || rhymex6.includes(beatx) && y6.includes(beaty)) {
        
          playSynthRhyme();
        
        } else {
         
          playSynthPing();
        }
      
    } else {
      noteR = zeR,
      noteG = zeG,
      noteB = zeB;
      
      playSynthZe();
    }

      //console.log (beatx, beaty);

  }

    // console.log(beatx, beaty);

    if (beaty > 6) {
      textSize(16);
      fill(noteColor);
      text('poetry complete', 20, 80);
    } else {
      textSize(16);
      fill(noteColor);
      text('running', 20, 80);
    }


  } else { // starting text
    textSize(16);
    fill(0,190,180);
    text('click to start', 20, 80);
  }
}

function playSynthPing() {
  userStartAudio();
  // notes can overlap with each other
  monoSynth.play('E4', vel, time, dur);
}

function playSynthZe() {
  userStartAudio();
  // notes can overlap with each other
  // polySynth.play('G3', vel, time += 1 / 2, dur);
  monoSynth.play('G3', vel, time, dur);
}

function playSynthRhyme() {
  userStartAudio();
  // notes can overlap with each other
  polySynth.play('C4', 0.03, time, dur);
  polySynth.play('G3', 0.03,0,0);
  polySynth.play('E4', 0.04,0,0);
}


function mouseClicked() {
  if (started === false) {
    started = true;
    }
}
