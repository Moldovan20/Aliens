window.addEventListener('load',function()
{

    let persons = [];

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width = 800;
    const canvasHeight = canvas.height = 900;
    
    
    const alienMars = document.getElementById("alienMars");
    const alienPluto = document.getElementById("alienPluto");
    const astronaut = document.getElementById("astronaut");

    const mars = document.getElementById("mars");
    const pluto = document.getElementById("pluto");
    const earth = document.getElementById("earth");

    var score = 0;
    let moveOnce = false;
    let index = 0;

    function handlePersons()
    {
        let position = 1;
        
        while(persons.length < 120)
        {
            
            let a = Math.random()*3;
            position++;
            let c = 100;
            if(a > 0 && a <= 1)
            {
               
                persons.push(new Person(canvasWidth, alienMars, c*position, "alienMars"));
          
            }
            if(a > 1 && a <= 2)
            {             
               persons.push(new Person(canvasWidth, alienPluto, c*position, "alienPluto"));
            }
            else if(a > 2 && a <= 3)
            {

               persons.push(new Person(canvasWidth, astronaut, c*position, "astronaut"));
            }
            
        }
        
        persons.forEach(person => {
            person.draw(ctx);
        });
        
        if(!moveOnce)
        {
            persons.forEach(person =>{
                person.move();
            });
            moveOnce = true;
        }       
    }

    let lastTime = 0;
    var time = 60;
    let seconds = 0;
    let timer = 0;
    let gameOver = false;

    const restartButton = document.getElementById('restart');

    restartButton.addEventListener('click', function() {
      location.reload();
    });
        
         function animate(timeStamp)
         {
             
             const deltaTime = timeStamp - lastTime;
             lastTime = timeStamp;
             
             timer += deltaTime;
        
        if(timer >= 1000){
            seconds++;
            timer = 0;      
        }

        let timing = time - seconds;
        if(timing <= 0)
        {
            gameOver = true;
            timing = 0;
        }
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        ctx.drawImage(mars, 0, 0, canvasWidth, canvasHeight,0, canvasHeight-180, 256, 256);

        ctx.drawImage(pluto, 0, 0, canvasWidth, canvasHeight,canvasWidth-200, canvasHeight-180, 256, 256);

        ctx.drawImage(earth, 0, 0, canvasWidth, canvasHeight,300, canvasHeight-180, 256, 256);
              
        if(!gameOver)
        {

            handlePersons();
            document.addEventListener('keyup', event => {
            if (event.key === 'ArrowLeft')
            {
                persons[index].update("left");
                moveOnce = false;
                
            } else if (event.key === 'ArrowRight') 
            {
                
                persons[index].update("right");
                moveOnce = false;
                
            }
            else if(event.key === 'ArrowDown')
            {
                persons[index].update("down");
                moveOnce = false;
            }

          });

          const directionEarth =  persons[index].getY() > canvasHeight;
          const directionMars = persons[index].getX() < 0;
          const directionPluto = persons[index].getX() > canvasWidth;
        
            //////////////////////////////////direction mars//////////////////////
        if(directionMars && persons[index].getpersonCategory() === "alienMars")
        {  
            score += 50;
            index++; 
        }
        else if(directionMars && persons[index].getpersonCategory() !== "alienMars")
        {  
            score -= 50;
            index++;       
        }
       
        //////////////////////////////////////direction earth////////////////////
        if(directionEarth && persons[index].getpersonCategory() === "astronaut")
        {  
            score += 50;
            index++; 
        }
        else if(directionEarth && persons[index].getpersonCategory() !== "astronaut")
        {  
            score -= 50;
            index++;       
        }
        //////////////////////////////////direction pluto////////////////////
        if(directionPluto && persons[index].getpersonCategory() === "alienPluto")
        {  
            score += 50;
            index++; 
        }
        else if(directionPluto && persons[index].getpersonCategory() !== "alienPluto")
        {  
            score -= 50;
            index++;       
        }
        
    }
        if(score < 0)score = 0;
        
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "rgb(0, 0, 0)";      
        ctx.fillText("Score : "+score, 100, 50);
        
        ctx.fillText("Time : " + timing, 600, 50);
        
        ctx.font= "30px Comic Sans MS";
        if(gameOver){
            ctx.fillText("Finish your score : " + score, 200, 400)
        }
            
        
        requestAnimationFrame(animate);
      }
      
     animate(0);  
    
   
});

function restart()
{
    score = 0;
    time = 0;
}