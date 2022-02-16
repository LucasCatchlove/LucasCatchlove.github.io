


let arr, gen, nth, arrss, sm
let col = 10
let current = 0
let f = false



function setup() {

  noLoop()
  frameRate(60)
 

  arr = randomArray(100)
  //arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -9, 3, 4]

  col = (windowWidth/2) / arr.length

  let canvas = createCanvas(arr.length * (col + 5) + col / 2, 755);
  canvas.parent('canvas-container')


  gen = bubbleSort()

  let slider = createSlider(10, 100, 20)
  slider.parent('slider')
  slider.style('width', '100%');
  slider.input(function () {
    noLoop();
    f = false;
    arr = randomArray(slider.value());
    col = windowWidth / (2 * arr.length)
    resizeCanvas(arr.length * (col + 5) + col / 2, 755)
    draw()
  })

  let btn = createButton('selection sort')
  btn.mousePressed(() => { f = true; loop(); gen = selectionSort() })
  let btn2 = createButton('bubble sort')
  btn2.mousePressed(() => { f = true; loop(); gen = bubbleSort() })
  let btn3 = createButton('insertion sort')
  btn3.mousePressed(() => { f = true; loop(); gen = insertionSort() })
}

function draw() {

  background('lightblue')
  displayArrayContents(arr)
  if (f)
    gen.next()
}


function* bubbleSort() {
  let n = arr.length
  nth = n
  let swapped = true

  while (swapped) {
    swapped = false
    for (let i = 1; i < n; i++) {
      current = i
      if (arr[i] < arr[i - 1]) {
        swap(arr, i, i - 1)
        swapped = true
        yield
      }
      yield
    }
    n--
  }
}

function* selectionSort() {
  let smallest
  for (let min = 0; min < arr.length; min++) {
    smallest = min
    for (let j = min + 1; j < arr.length; j++)
      if (arr[j] < arr[smallest]) smallest = j

    swap(arr, min, smallest)
    sm = smallest
    current = min
    yield
  }
}

function* insertionSort() {
  for (let curr = 1; curr < arr.length; curr++) {
    current = curr

    if (arr[curr] < arr[curr - 1]) {
      let position = curr - 1

      for (let j = curr - 2; j >= 0; j--) {
        sm = j
        if (arr[curr] < arr[j]) {
          position = j
          yield
        }
        else break
        
      }
      insert(position, curr)
      current = position
      yield
      
    }
  }

}

function insert(position, current) {
  let currentEl = arr[current]
  for (let i = current; i > position; i--) arr[i] = arr[i - 1]
  arr[position] = currentEl
}


function mergeSort() {
  
}

function swap(arr, a, b) {
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

function displayArrayContents(arr) {
  for (let i = 0; i < arr.length; i++) {

    noStroke()
    fill(255, 255 - arr[i] * 3, 100)

    if (i == current)
      fill('green')
    if (i == sm)
      fill('purple')

    rect(5 + i * (col + 5), height - arr[i] * 10, col, arr[i] * 10)
  }
}

function randomArray(size) {
  let arr = []
  for (let i = 0; i < size; i++) {
    arr.push(floor(random(1, 75)))
  }
  return arr
}



