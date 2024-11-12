let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let w,h;
let ai ='X';
let human='O';
let currentPlayer= human;

function setup (){
    createCanvas(400,400);
    w= width/3;
    h= height/3;
    bestMove();
}

function equal(a, b, c){
    return (a==b && b==c && a!= '');
}

function checkWinner(){
    let winner = null;
    for(let i=0;i<3;i++){
        if(equal(board[i][0], board[i][1], board[i][2])){
            winner= board[i][0]; 
        }
    }

    for(let i=0;i<3;i++){
        if(equal(board[0][i], board[1][i], board[2][i])){
            winner= board [0][i];
        }
    }

    if(equal(board[0][0], board[1][1], board [2][2])){
        winner= board[0][0];
    }
    if(equal(board[2][0], board[1][1], board[0][2])){
        winner= board [2][0];
    }

    let openslots= 0;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]=='')openslots++;
        }
    }
    if(openslots==0 && winner==null){
        return 'tie';
    }else{
        return winner;
    }
}

function mousePressed () {
    if(currentPlayer=human){
        let x= floor (mouseX/w);
        let y= floor (mouseY/h);

        if(board[x][y] == ''){
            board[x][y]=human;
            currentPlayer= ai;
            bestMove();
        }
    }
}

function draw() {
    background(255);
    strokeWeight(4);
  
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
  
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = board[i][j];
        textSize(32);
        let r = w / 4;
        if (spot == human) {
          noFill();
          ellipse(x, y, r * 2);
        } else if (spot == ai) {
          line(x - r, y - r, x + r, y + r);
          line(x + r, y - r, x - r, y + r);
        }
      }
    }
  
    let result = checkWinner();
    if (result != null) {
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (result == 'tie') {
        resultP.html('Tie!');
      } else {
        resultP.html(`${result} wins!`);
      }
    }
  }
  