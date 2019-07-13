const range = (n) => Array(n).fill(null);

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;
const GREEN = 'green';
const BLUE  = 'blue';
const RED   = 'red';
const ANIMATION_INTERVAL = 2000;

const { innerWidth: width, innerHeight: height } = window;
const X_OFFSET = (width/NUM_COLUMNS) / 2 - 10;
const Y_OFFSET = (height/NUM_ROWS) / 2 - 10;

const setPosition = (box, index) => {
  if(index % 10 === 0) {
    box.classList.toggle('hide')
    setTimeout(() => box.classList.toggle('hide'), ANIMATION_INTERVAL / 2);
  }

  box.dataset.index = index;
  const x = X_OFFSET + ((index % NUM_COLUMNS) * width/NUM_COLUMNS);
  const y = Y_OFFSET + ((height/NUM_ROWS) * Math.floor(index/NUM_ROWS));

  box.style.left = `${x}px`;
  box.style.top  = `${y}px`;
}

const makeBox = (color, index) => {
  const box = document.createElement('div');
  box.className = `box ${color}`;

  setPosition(box, index);

  return box;
};

const greenCircles = range(100).map((_, index) => makeBox(GREEN, index));
const redCircles = range(100).map((_, index) => makeBox(RED, index));
const blueCircles = range(100).map((_, index) => makeBox(BLUE, index));

const animate = () => {
  // move diagonal right
  greenCircles.forEach(box => {
    const { index } = box.dataset;
    const newIndex = (parseInt(index) + 11) % 100;
    setPosition(box, newIndex);
  });

  // move right
  redCircles.forEach(box => {
    const { index } = box.dataset;
    const newIndex = (parseInt(index) + 1) % 100;
    setPosition(box, newIndex);
  })

  // move diagonal left
  blueCircles.forEach(box => {
    const { index } = box.dataset;
    const newIndex = (parseInt(index) - 9) % 100 < 100 ? ((parseInt(index) - 9) + 100) % 100 : (parseInt(index) - 9) % 100;
    setPosition(box, newIndex);
  })
};


// init
document.getElementById('canvas')
  .append(...greenCircles, ...redCircles, ...blueCircles);

setInterval(animate, ANIMATION_INTERVAL);

