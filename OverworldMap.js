class OverworldMap {
    constructor(config){
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }

}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "./assets/testBg.png",
        upperSrc: "",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),

    /*      npc1: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(3),
                src: "./assets/hero.png",
            }),     */ 

        }
    }
}