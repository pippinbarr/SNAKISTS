class Menu extends Snake {

  constructor(config) {
    super({
      key: `menu`
    });

    this.SNAKE_TICK = 0.03;
    this.SNAKE_START_X = 0;
    this.SNAKE_START_Y = 8;
  }

  create() {
    super.create();

    this.delisted = localStorage.getItem("snakists-delisted") === "true";

    this.title = this.strings.title;

    this.games = [];
    let index = 0;
    for (let game of this.strings.ui.games) {
      this.games.push({
        index: index,
        title: this.strings[game].menuName,
        state: game
      });
      index++;
    };

    this.selected = 0;

    this.menuButtons = this.add.group();
    this.menuText = this.add.group();
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.createMenu();

    this.setScoreText("");
    this.snakeBitsToAdd = 20;

    this.transition = false;
  }

  tick() {
    this.addSnakeBits();
    this.updateSnakePosition();

    if (this.selected < this.games.length && this.games[this.selected].state === "delist") {
      const col = this.snakeHead.x / this.GRID_SIZE;
      const row = this.snakeHead.y / this.GRID_SIZE;
      if (this.snakeHead.x < this.width) {
        this.textGrid[row][col].text = "";
      }
    }
  }

  handleKeyboardInput() {
    if (this.transition) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.up();
    }
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.down();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.right();
    }
  }

  /**
   * Create stuff
   */

  createMenu() {
    const titleX = 2;
    const titleY = 3
    this.addTextToGrid(titleX, titleY, this.title);

    const menuTop = 8;
    let x = 2;
    let y = menuTop;

    for (let game of this.games) {
      if (game.state === "delist" && this.delisted) {
        this.addTextToGrid(x, y, "", this.menuText)//, this.menuButtons, this.menuItemTouched);
      }
      else {
        this.addTextToGrid(x, y, [game.title], this.menuText)//, this.menuButtons, this.menuItemTouched);
      }
      y++;
    }

    const menuBottom = menuTop + this.games.length - 1;

    this.addTextToGrid(x, menuBottom + 2, ["PIPPINBARR.COM"], this.menuText)//, this.menuButtons, this.menuItemTouched);


    let instructions = "OH NO."
    if (this.sys.game.device.os.desktop) {
      instructions = this.strings.menu.instructions.keyboard;
    }
    else {
      instructions = this.strings.menu.instructions.touch;
    }
    this.addTextToGrid(x, this.NUM_ROWS - 3, instructions);
  }

  createControls() {

  }

  createWalls() {
    this.wallGroup = this.physics.add.group();
  }

  up() {
    if (this.selected > 0) {
      this.selected--;
      this.snakeHead.y -= this.GRID_SIZE;
      if (this.selected < this.games.length && this.games[this.selected].state === "delist" && this.delisted) {
        this.selected--;
        this.snakeHead.y -= this.GRID_SIZE;
      }
      else if (this.selected === this.games.length) {
        this.selected--;
        this.snakeHead.y -= this.GRID_SIZE;
      }

      this.moveSFX.play();
    }
  }

  down() {
    if (this.selected < this.games.length) {
      this.selected++;

      this.snakeHead.y += this.GRID_SIZE;
      if (this.selected < this.games.length && this.games[this.selected].state === "delist" && this.delisted) {
        this.selected++;
        this.snakeHead.y += this.GRID_SIZE;
      }
      else if (this.selected === this.games.length) {
        this.selected++;
        console.log("Boop")
        this.snakeHead.y += this.GRID_SIZE;
      }

      this.moveSFX.play();
    }
  }

  left() {

  }

  right() {
    let callback = () => {
      const stateName = this.games[this.selected].state;
      this.scene.start("walloftext", this.strings[stateName]);
    }

    if (this.selected === this.games.length + 1) {
      callback = () => {
        window.open("https://pippinbarr.com", "_blank");
        this.next = new Phaser.Geom.Point(0, 0);
        this.snakeHead.x = 0;
        this.transition = false;
        this.moveSFX.setVolume(1);
      }
    }
    else if (this.games[this.selected].state === "delist") {
      localStorage.setItem("snakists-delisted", true);
    }
    this.next = new Phaser.Geom.Point(this.GRID_SIZE, 0);
    this.transition = true;
    this.appleSFX.play();
    // For some reason it plays a single moveSFX at the end of the scene??
    this.moveSFX.setVolume(0);
    this.time.addEvent({
      delay: 1500,
      callback: callback
    })
  }
}