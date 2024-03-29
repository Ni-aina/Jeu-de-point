window.onload = ()=> {
    const width = window.screen.width - 25;
    const height = window.screen.height - Math.floor(window.screen.height/3);
    const size = 30;
    let ctx;
    let round = 1;
    let draw = false;
    let Points = [];
    let score1 = 0;
    let score2 = 0;
    const drawLines = ()=> {
        for (let i=1; i<(height/size); i++) {
            ctx.moveTo(0, i*size);
            ctx.lineTo(width, i*size);
        }
        for (let i=1; i<(width/size); i++) {
            ctx.moveTo(i*size, 0);
            ctx.lineTo(i*size, height);
        }
        ctx.stroke();
    }
    const drawPoint = (i, j)=> {
        if (Points[i][j][0]===null) {
            ctx.beginPath();
            Points[i][j][0] = round===1 ? 1 : -1;
            ctx.strokeStyle = round===1 ? "red" : "blue";
            ctx.arc(j*size, i*size, 5, 0,Math.PI*2, true);
            ctx.fill();
            ctx.stroke();
            round*=-1;
        }
    }
    const Matrice = ()=> {
        const lenX = parseInt(width/size);
        const lenY = parseInt(height/size);
        for (let i = 0; i <= lenY+10; i++) {
            Points.push([]);
            for (let j = 0; j <= lenX+10; j++) {
                Points[i].push([null, false, false, false, false]);
            }
        }
    }
    const Lines = ()=> {
        const lenX = parseInt(width/size);
        const lenY = parseInt(height/size);
        for (let i = 0; i <= lenY; i++) {
            for (let j = 0; j <= lenX; j++) {
                let xDraw = true;
                let yDraw = true;
                let D = true;
                let DI = true;
                for (var kX = j; kX < (j+5) && kX <= (lenX+1); kX++) {
                    if (Points[i][kX][0]!==Points[i][j][0] || Points[i][kX][0]===null || Points[i][kX][1]===true) xDraw = false;
                }
                for (var kY = i; kY < (i+5) && kY <= (lenY+1); kY++) {
                    if (Points[kY][j][0]!==Points[i][j][0] || Points[kY][j][0]===null || Points[kY][j][2]===true) yDraw = false;
                }
                for (var kD = 0; kD < 5 && (kD+j) <= lenX && (kD+i) <= lenY; kD++) {
                    if (Points[i+kD][j+kD][0]!==Points[i][j][0] || Points[i+kD][j+kD][0]===null || (Points[i+kD][j+kD][3]===true) ||
                    (Points[i+kD][j+kD+1][4]===true && Points[i+kD+1][j+kD][4]===true && kD!==4 && 
                    (Points[i+kD][j+kD+1][0]!==Points[i+kD][j+kD][0] && Points[i+kD+1][j+kD][0]!==Points[i+kD][j+kD][0]))) D = false;
                }
                for (var kDI = 0; kDI < 5 && (kDI+j) <= lenX && (kDI+i) <= lenY; kDI++) {
                    if (Points[i+kDI][(j+4)-kDI][0]!==Points[i][j+4][0] || Points[i+kDI][(j+4)-kDI][0]===null || Points[i+kDI][(j+4)-kDI][4]===true ||
                    (j!==0 && Points[i+kDI][(j+3)-kDI][3]===true && Points[i+kDI+1][(j+4)-kDI][3]===true && kDI!==4 &&
                    (Points[i+kDI][(j+3)-kDI][0]!==Points[i+kDI][(j+4)-kDI][0] && Points[i+kDI+1][(j+4)-kDI][0]!==Points[i+kDI][(j+4)-kDI][0]))) DI = false;
                }
                ctx.beginPath();
                ctx.strokeStyle = Points[i][j][0]===1 ? "red" : "blue";
                if (xDraw) {
                    draw = true;
                    ctx.moveTo(j*size, i*size);
                    ctx.lineTo((kX-1)*size, i*size);
                    for (let k=j; k<(j+5); k++) {
                        Points[i][k][1]=true;
                    }
                }
                if (yDraw) {
                    ctx.moveTo(j*size, i*size);
                    ctx.lineTo(j*size, (kY-1)*size);
                    for (let k=i; k<(i+5); k++) {
                        Points[k][j][2]=true;
                    }
                }
                if (D && kD===5) {
                    ctx.moveTo(j*size, i*size);
                    ctx.lineTo((j+4)*size, (i+4)*size);
                    for (let k=0; k<5; k++) {
                        Points[i+k][j+k][3]=true;
                    }
                }
                if (DI && kDI===5) {
                    ctx.strokeStyle = Points[i][(j+4)][0]===1 ? "red" : "blue";
                    ctx.moveTo(j*size, (i+4)*size);
                    ctx.lineTo((j+4)*size, i*size);
                    for (let k=0; k<5; k++) {
                        Points[i+k][(j+4)-k][4]=true;
                    }
                }
                ctx.stroke();
                if (xDraw || yDraw || (D && kD===5) || (DI && kDI===5)) {
                    round*=-1;
                    draw = true;
                    if (round===1) score1++;
                    else score2++;
                    const sc1 = document.getElementById("P1");
                    const sc2 = document.getElementById("P2");
                    sc1.textContent = score1;
                    sc2.textContent = score2;
                }
            }
        }
    }
    const rounds = ()=> {  
        const Player = document.getElementById('Player');
        Player.style.color = round===1? "red" : "blue";
        const rd = round===1? "P1" : "P2";
        Player.textContent = rd;
    }
    const init = ()=> {
        Matrice();
        const canvas = document.createElement('canvas');
        const div = document.createElement('div');
        document.body.appendChild(div);
        div.style.position = "fixed";
        div.style.bottom = "10px";
        div.style.display = "grid";
        div.style.gridTemplateColumns = "1fr 1fr 1fr";
        div.style.alignItems = "center";
        div.style.gap = "20px";
        const sc1 = document.createElement('p');
        sc1.style.color = "grey";
        const round = document.createElement('h3');
        round.id = "round";
        round.style.color = "Orange";
        round.textContent = "Round : ";
        div.appendChild(round);
        sc1.textContent = "Player one : ";
        div.appendChild(sc1);
        const sp1 = document.createElement('span');
        sp1.id = "P1";
        sp1.style.color = "red";
        sp1.textContent = score1;
        sc1.appendChild(sp1);
        const sc2 = document.createElement('p');
        sc2.style.color = "grey";
        sc2.textContent = "Player two : ";
        div.appendChild(sc2);
        const sp2 = document.createElement('span');
        sp2.id = "P2";
        sp2.style.color = "blue";
        sp2.textContent = score2;
        sc2.appendChild(sp2);
        const Player = document.createElement('span');
        Player.id = "Player";
        Player.style.padding = "0px 3px";
        Player.style.border = "1px solid grey";
        Player.style.borderRadius = "2px";
        Player.style.color = "red";
        Player.style.fontSize = "17px";
        Player.style.fontWeight = "bold";
        Player.textContent = "P1";
        round.appendChild(Player);
        canvas.width = width;
        canvas.height = height;
        canvas.style.border = "2px solid grey";
        canvas.style.borderRadius = "3px";
        canvas.style.display = "block";
        canvas.style.margin = "0";
        ctx = canvas.getContext('2d');
        document.body.appendChild(canvas);
        drawLines();
        canvas.onclick = (e)=> {
            const cursorX = Math.floor(e.clientX/size);
            const cursorY = Math.floor(e.clientY/size);
            drawPoint(cursorY, cursorX);
            Lines();
            if (draw)
                draw = false;
            else
                rounds();
        }
    }
    init();
}