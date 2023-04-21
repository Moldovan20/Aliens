window.addEventListener('load',function()
{

    let monstres = [];

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width = 700;
    const canvasHeight = canvas.height = 700;

    const background = document.getElementById("background");
    
    const marsMonsterImage = document.getElementById('marsMonster');
    const plutoMonsterImage = document.getElementById('plutoMonster');
    
    const mars = document.getElementById("mars");
    const pluto = document.getElementById("pluto");

    let score = 0;
    let lastTime = 0;
    
    let once = false;
    let move = false;
    let moveOnce = false;
    
    let index = 0;

   
    const getInput = new InputHandler();

    function handleMonsters(deltaTime)
    {
        let position = 1;
        
        while(monstres.length < 50)
        {
            
            let a = Math.random()
            position++;
            if(a < 0.5)
            {

                monstres.push(new Monsters(canvasWidth, canvasHeight, marsMonsterImage, 70*position, "mars")); 
            }
                
            else monstres.push(new Monsters(canvasWidth, canvasHeight,plutoMonsterImage, 70*position,"pluto"));
            
        }
        
        monstres.forEach(monster => {
            monster.draw(ctx);
        });

        if(move && !moveOnce)
        {
            monstres.forEach(monster =>{
                monster.move();
            });
            moveOnce = true;
        }
            
            monstres = monstres.filter(monster => !monster.markForDelete);
            console.log(moveOnce);
        
    }
    document.addEventListener("keydown", function(event) {
            if (event.keyCode === 37) {
            // The left arrow key was pressed
            console.log("Left arrow key was pressed");
            } else if (event.keyCode === 39) {
            // The right arrow key was pressed
            console.log("Right arrow key was pressed");
            }
        });
        
    /*document.addEventListener("keydown", function(event) {
        if (event.keyCode === 38) {
          // The up arrow key was pressed
          console.log("Up arrow key was pressed");
        } else if (event.keyCode === 40) {
          // The down arrow key was pressed
          console.log("Down arrow key was pressed");
        }
      });*/

      


    
    function animate(timeStamp)
    {
        
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight,0, 0, canvasWidth, canvasHeight);
        
        ctx.drawImage(mars, 0, 0, canvasWidth, canvasHeight,0, canvasHeight-100, canvasWidth, canvasHeight);
        ctx.drawImage(pluto, 0, 0, canvasWidth, canvasHeight,canvasWidth-220, canvasHeight-100, canvasWidth, canvasHeight);
        //console.log(monstres);
        
        handleMonsters(deltaTime);
        monstres[index].update(getInput);

        if(monstres[index].getY() > canvasHeight-100 && monstres[index].getX() < 300 && monstres[index].getMonsterCategory() == "mars" )
        {  
            score += 50;
            once = true;
            move = true;
            onceMove = false;
            index++;  
        }

        else if(monstres[index].getY()  > canvasHeight-100 && monstres[index].getX() >300 && monstres[index].getMonsterCategory() == "pluto"  )
        {           
            score += 50;
            once = true;
            move = true;
            onceMove = false;
            index++;
          
        }

        //console.log(index);
    
        
        
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "rgb(25, 255, 100)";
        ctx.textAlign = "center";
        ctx.fillText("Score : "+score, 100, 50);
        //console.log(monstres)
        requestAnimationFrame(animate);
    }
  
     animate(0);

     
   

});