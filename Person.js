class Person
{
    
    constructor(canvasWidth, image, position, personCategory)
    {
        this.position = 100;
        this.width = 512;
        this.height = 512;
        this.x = canvasWidth/2-50;
        this.y = 500-position;
        this.image = image;
        this.personCategory = personCategory;
        this.speed = 1000;
    }

    getY()
    {
        return this.y;
    }

    getX()
    {
        return this.x;
    }

    getpersonCategory()
    {
        return this.personCategory;
    }

    move()
    {
        this.y +=100;
    }


    draw(context)
    {
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x , this.y, this.width, this.height);
    }
    update(key)
    {
        if(key == "left")
        {
        
         this.x -= this.speed;
         
        }

        else if (key == "right")
        {
            this.x += this.speed;
                  
        }

        else if (key == "down")
        {
            this.y += this.speed;       
        }
    }
}