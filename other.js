     
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "rgb(25, 255, 100)";
        ctx.textAlign = "center";
        ctx.fillText("Score : "+score, 100, 50);


        ctx.drawImage(mars, 0, 0, canvasWidth, canvasHeight,0, canvasHeight-100, canvasWidth, canvasHeight);
        ctx.drawImage(pluto, 0, 0, canvasWidth, canvasHeight,canvasWidth-220, canvasHeight-100, canvasWidth, canvasHeight);