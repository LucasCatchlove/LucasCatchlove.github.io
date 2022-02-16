//let arr1 = [8, 11, 68, 67, 50, 60, 54, 38, 28, 53, 19, 56, 75, 47, 40, 18, 42, 64, 5, 72, 10, 22, 6, 14, 45, 25, 46, 34, 70, 29, 48, 50, 60, 54, 38]

let arr1 = []


let bs
let col = 40

function setup() {

  frameRate(60)

  for (let i = 0; i < 30; i++) {
    arr1.push(floor(random(0, 80)))
  }

  bs = new BubbleSort(arr1)

  createCanvas(arr1.length * (col + 5) + col / 2, 800);
}

function draw() {
  clear()
  background('lightblue')
  displayArrayContents(bs.arr, bs.previous, bs.limit)
  bs.sort()

}

function BubbleSort(toSort) {
  this.arr = toSort
  this.swapped = false
  this.current = 1
  this.previous = 0
  this.limit = toSort.length
}

BubbleSort.prototype.swap = function (a, b) {
  let temp = this.arr[a]
  this.arr[a] = this.arr[b]
  this.arr[b] = temp
}

BubbleSort.prototype.updateIndices = function () {
  this.previous++
  this.current++
}

BubbleSort.prototype.sort = function () {

  if (this.current != this.arr.length) {

    if (this.arr[this.current] < this.arr[this.previous]) {
      this.swap(this.previous, this.current)
      this.swapped = true
    }
    this.updateIndices()
  }

  if (this.swapped && this.current == this.limit) {
    this.limit--
    this.current = 1
    this.previous = 0
    this.swapped = false
  }
}

function SelectionSort(toSort) {
  // to implement next 
}

function displayArrayContents(arr, current, limit) {
  for (let i = 0; i < arr.length; i++) {

    noStroke()
    fill(255, 255 - arr[i] * 3, 100)

    if (i == current && i <= limit)
      fill('green')

    rect(5 + i * (col + 5), height - arr[i] * 10, col, arr[i] * 10)
  }
}





