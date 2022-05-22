class Sprite {
    constructor(config){

        //Setting up Images
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //Drawing the Shadow
        this.shadow = new Image();
        this.shadow.src = "./assets/shadow.png";
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }
        this.useShadow = true; //config.useShadow 

        //Configuring Animations and Initial States
        this.animations = config.animations || {
            "idle-down": [ [0,0] ],
            "idle-up": [ [0,2] ],
            "idle-right": [ [0,1] ],
            "idle-left": [ [0,3] ],
            "walk-down": [ [1,0], [0,0], [3,0], [0,0] ],
            "walk-up": [ [1,2], [0,2], [3,2], [0,2] ],
            "walk-left": [ [1,3], [0,3], [3,3], [0,3] ],
            "walk-right": [ [1,1], [0,1], [3,1], [0,1] ]
        }
        this.currentAnimation = "walk-left"; // config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameLimit;

        //Referencing the game Object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key){
        if(this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        //Downtick frame progress
        if(this.animationFrameProgress > 0 ){
            this.animationFrameProgress -= 1;
            return;
        }

        //Reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if(this.frame === undefined){
            this.currentAnimationFrame = 0;
        }


    }

    draw(ctx) {
        const x = this.gameObject.x;
        const y = this.gameObject.y-1;

        this.isShadowLoaded && ctx.drawImage(
            this.shadow,
            x-8, y+1,
        );

        const [frameX, frameY] = this.frame; 

        this.isLoaded && ctx.drawImage(
            this.image,
            frameX * 32, frameY * 32,
            32, 32,
            x, y,
            32, 32
        )
        
        this.updateAnimationProgress();
    }
}