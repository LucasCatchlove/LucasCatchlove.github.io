function setup(){const e=createCanvas(rows*side,cols*side);e.parent("canvas-container"),frameRate(30),startingI=floor(random(0,floor(rows/3))),startingJ=floor(random(0,floor(cols/3))),endingI=floor(random(floor(rows/3),rows)),endingJ=floor(random(floor(cols/3),cols));for(let e=0;e<rows;e++)for(let i=0;i<cols;i++)grid.push(new Cell(e,i));current=grid[0],current.visited=!0,grid.forEach(e=>e.display()),playPauseButton.addEventListener("click",pause),playPauseButton.disabled=!0,stepButton.addEventListener("click",step),stepButton.disabled=!0,solveButton.addEventListener("click",solve),solveButton.disabled=!0,newMazeButton.addEventListener("click",newMaze)}function pause(){noLoop(),playPauseButton.innerHTML="play",playPauseButton.removeEventListener("click",pause),playPauseButton.addEventListener("click",play)}function play(){loop(),playPauseButton.innerHTML="pause",playPauseButton.removeEventListener("click",play),playPauseButton.addEventListener("click",pause)}function step(){playPauseButton.innerHTML="play",playPauseButton.addEventListener("click",play),noLoop(),draw()}function newMaze(){cells=[],current=grid[0],solveButton.innerHTML="solve maze",beginGeneration=!0,playPauseButton.disabled=!1,stepButton.disabled=!1,mazeGenerated&&(mazeSolved||(newMazeButton.disabled=!1),playPauseButton.disabled=!1,stepButton.disabled=!1,solveButton.disabled=!0,mazeSolved=!1),mazeGenerated=!1,grid.forEach(e=>{e.visited=!1,e.solutionPathMember=!1,e.walls=[!0,!0,!0,!0]}),playPauseButton.innerHTML="pause",loop()}function solve(){playPauseButton.disabled=!1,stepButton.disabled=!1,solveButton.disabled=!0,mazeSolved&&(playPauseButton.disabled=!1,stepButton.disabled=!1,startingI=floor(random(0,rows)),startingJ=floor(random(0,cols)),endingI=floor(random(0,rows)),endingJ=floor(random(0,cols))),beginSolving=!0,mazeSolved=!1,grid.forEach(e=>{e.visited=!1,e.solutionPathMember=!1}),current=grid[index(startingI,startingJ)],current.visited=!0,current.solutionPathMember=!0,mazeSolved=!1,solveButton.innerHTML="solve for new points",playPauseButton.innerHTML="pause",loop()}function draw(){beginGeneration&&(mazeGenerated?dfsSolver():recursiveBacktrackerGenerator())}function recursiveBacktrackerGenerator(){mazeSolved||grid.forEach(e=>e.display());let e=current.checkAdjacentCells();e?(e.visited=!0,cells.push(current),removeWalls(current,e),current=e):cells.length>0?current=cells.pop():(grid.forEach(e=>e.visited=!1),current=grid[index(startingI,startingJ)],mazeGenerated=!0,beginSolving=!1,current.visited=!0,current.solutionPathMember=!0,solveButton.disabled=!1,playPauseButton.disabled=!0,stepButton.disabled=!0,grid.forEach(e=>e.display()))}function dfsSolver(){if(!mazeSolved&&beginSolving){grid.forEach(e=>e.display());let e=current.findPassage();current.i==endingI&&current.j==endingJ?(noLoop(),mazeSolved=!0,playPauseButton.disabled=!0,stepButton.disabled=!0,solveButton.disabled=!1,newMazeButton.disabled=!1,grid.forEach(e=>e.display())):e?(e.visited=!0,e.solutionPathMember=!0,cells.push(current),current=e):cells.length>0&&(current.solutionPathMember=!1,current=cells.pop())}}function Cell(e,i){this.i=e,this.j=i,this.visited=!1,this.solutionPathMember=!1,this.walls=[!0,!0,!0,!0]}function index(e,i){return e<0||i<0||e>rows-1||i>cols-1?-1:e*rows+i}function removeWalls(e,i){i.i>e.i?(i.walls[0]=!1,e.walls[1]=!1):i.i<e.i?(i.walls[1]=!1,e.walls[0]=!1):i.j>e.j?(i.walls[3]=!1,e.walls[2]=!1):(i.walls[2]=!1,e.walls[3]=!1)}let grid=[],cells=[];const rows=17,cols=17,side=40;let current,startingI,startingJ,endingI,endingJ,mazeGenerated=!1,mazeSolved=!1,beginSolving=!1,beginGeneration=!1;const playPauseButton=document.getElementById("playpause-btn"),stepButton=document.getElementById("step-btn"),solveButton=document.getElementById("solve-btn"),newMazeButton=document.getElementById("newmaze-btn");Cell.prototype.display=function(){mazeGenerated?this.solutionPathMember?(noStroke(),mazeSolved?fill("#1e88e5"):fill("#03a9f4"),ellipse(side/2+this.i*side,side/2+this.j*side,side/3.5,side/3.5)):(noStroke(),fill(255),rect(this.i*side,this.j*side,side,side)):(noStroke(),fill(255),rect(this.i*side,this.j*side,side,side),current.i==this.i&&current.j==this.j&&current!=grid[0]&&(fill(color("#ff7f7f")),ellipse(side/2+this.i*side,side/2+this.j*side,side/1.75,side/1.75))),(this.i==startingI&&this.j==startingJ||this.i==endingI&&this.j==endingJ)&&mazeGenerated&&(mazeSolved?(noStroke(),fill("#1e88e5")):fill("#1e88e5"),ellipse(side/2+this.i*side,side/2+this.j*side,side/1.75,side/1.75)),stroke(150),(this.walls[0]||grid[index(this.i-1,this.j)].walls[1])&&0!=this.i&&(line(this.i*side,this.j*side,this.i*side,(this.j+1)*side),line(this.i*side,this.j*side,this.i*side,(this.j+1)*side)),(this.walls[1]||grid[index(this.i+1,this.j)].walls[0])&&this.i!=rows-1&&(line((this.i+1)*side,this.j*side,(this.i+1)*side,(this.j+1)*side),line((this.i+1)*side,this.j*side,(this.i+1)*side,(this.j+1)*side)),(this.walls[2]||grid[index(this.i,this.j+1)].walls[3])&&this.j!=cols-1&&(line(this.i*side,(this.j+1)*side,(this.i+1)*side,(this.j+1)*side),line(this.i*side,(this.j+1)*side,(this.i+1)*side,(this.j+1)*side)),(this.walls[3]||grid[index(this.i,this.j-1)].walls[2])&&0!=this.j&&(line(this.i*side,this.j*side,(this.i+1)*side,this.j*side),line(this.i*side,this.j*side,(this.i+1)*side,this.j*side))},Cell.prototype.checkAdjacentCells=function(){let e=[],i=grid[index(this.i-1,this.j)],t=grid[index(this.i+1,this.j)],s=grid[index(this.i,this.j+1)],n=grid[index(this.i,this.j-1)];if(i&&!i.visited&&e.push(i),t&&!t.visited&&e.push(t),s&&!s.visited&&e.push(s),n&&!n.visited&&e.push(n),e.length>0){let i=floor(random(0,e.length));return e[i]}return null},Cell.prototype.findPassage=function(){let e=grid[index(this.i-1,this.j)],i=grid[index(this.i+1,this.j)],t=grid[index(this.i,this.j+1)],s=grid[index(this.i,this.j-1)];return!e||e.visited||this.walls[0]?!i||i.visited||this.walls[1]?!t||t.visited||this.walls[2]?!s||s.visited||this.walls[3]?null:s:t:i:e};