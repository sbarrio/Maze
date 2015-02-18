enchant();

//CONFIG
var SCR_WIDTH = 320;
var SCR_HEIGHT = 240;

var TILES_SIZE = 16; //px
var TILES_WIDTH = 20; // 20tiles * 16px eaxh = 320px h
var TILES_HEIGHT = 15; // 15 tiles * 16 px each = 240px v


//CHANGE MAP
var NO_GATE = -1;

//Movement Constants
var UP = 0;
var UP_RIGHT = 1;
var RIGHT = 2;
var DOWN_RIGHT =3;
var DOWN = 4;
var DOWN_LEFT = 5;
var LEFT = 6;
var UP_LEFT = 7;

//Player
var playerSpeed = 3;
var playerSpriteSpeed = 0.12

window.onload = function() {

    var game = new Game(SCR_WIDTH, SCR_HEIGHT);
    // Preload resources
    game.preload('res/player.png',
    			 'res/roboTile.png',
    			 'res/dialog.png',
    			 'res/boss.png',
    			 'res/cat.png');

    //  Game settings
    game.fps = 30;
    game.scale = 1;
    game.onload = function() {
        //key bindings
        game.keybind(65, 'b');
        game.keybind(83, 'a');
        game.keybind(32, 'space');

        
        // Once Game finishes loading
        var scene = new MapScene(0,160,160,null);
        game.pushScene(scene);
    }
    // Start
    game.start(); 

	//SCENES

	// MapScene
	var MapScene = Class.create(Scene, {
	    initialize: function(numLevel,startX,startY,gamedata) {
			//Scene vars
			var player;

			//Scene init
	    	Scene.apply(this);
        	var game = Game.instance;
        	this.backgroundColor="black";

        	//Loads player
        	//getting startPosition
        	player = new Player(startX,startY);
        	this.player = player;

        	//loads map
        	this.numLevel = numLevel;
        	var inputLevel = level[numLevel];
        	var map = new Map(16,16);
			map.image = game.assets[inputLevel.image];
			var gates = inputLevel.gates;
			this.gates = gates;
			map.loadData(inputLevel.tile,inputLevel.obj);
			map.collisionData = inputLevel.collision;
			this.map = map;


			//loads npcs
			var npcPool = new Group();
			this.npcPool = npcPool;

			for (var i=0;i<inputLevel.npc.length;i++){
				var inp = inputLevel.npc[i];
				var newNpc = new NPC(inp.x,inp.y,inp.img,inp.dialog);
				npcPool.addChild(newNpc);
			}

			//loads dialog


		////APPEND TO SCENE

         	//adds map to scene
        	this.addChild(map);

			//adds player to the scene
        	this.addChild(player);

        	//adds NPCs to scene
        	this.addChild(npcPool);
        	
            if (numLevel == 7){
                dialog = new Dialog(0,160);
            	this.dialog = dialog;
                this.addChild(dialog);
    	        text = new Label("Get back to work!");
    	        text.x = this.dialog.x +10;
    	        text.y = this.dialog.y + 10;
            	text.color = '#CBDBA3';
            	text.font = '12px';
           		text.textAlign = 'left';
           		text.font = '12px strong Arial, sans-serif';
            	this.text = text;
            	this.visible = "none";
            	this.addChild(text);
            }
            if (numLevel == 4){
                dialog = new Dialog(0,160);
                this.dialog = dialog;
                this.addChild(dialog);
    	        text = new Label("GO UP HERE. BRZZT.");
    	        text.x = this.dialog.x +10;
    	        text.y = this.dialog.y + 10;
            	text.color = '#CBDBA3';
            	text.font = '12px';
           		text.textAlign = 'left';
           		text.font = '12px strong Arial, sans-serif';
            	this.text = text;
            	this.visible = "none";
            	this.addChild(text);
            }
	    },
	    onenterframe: function(evt) {
	        var up = false;
	        var right = false;
	        var down = false;
	        var left = false;
	        //reset player movement
			this.player.moving = false;
			this.player.moveSpeed = 0;

			//Check input
			if(game.input.left && !game.input.right){
	            this.player.moveSpeed = playerSpeed;
	            left = true;
	            this.player.moving = true;
	        }
	        else if(game.input.right && !game.input.left){
	            this.player.moveSpeed = playerSpeed;
	            right = true;
	         	this.player.moving = true;
	        }
	        if(game.input.up && !game.input.down){
	            this.player.moveSpeed = playerSpeed;
	            up = true;
	            this.player.moving = true;
	        }
	        else if(game.input.down && !game.input.up){
	            this.player.moveSpeed = playerSpeed;
	            down = true;
	            this.player.moving = true;
	        }

	        //obtain direction
	       	if (left){
	        	this.player.direction = LEFT;
	        }else if (right){
	        	this.player.direction = RIGHT;
	        }

	        if (up){
	        	this.player.direction = UP;
	        	if (right){
	        		this.player.direction = UP_RIGHT;
	        	}
	        	else if(left){
	        		this.player.direction = UP_LEFT;	
	        	}
	        }
	       	if (down){
	        	this.player.direction = DOWN;
	        	if (right){
	        		this.player.direction = DOWN_RIGHT;
	        	}
	        	else if(left){
	        		this.player.direction = DOWN_LEFT;	
	        	}
	        }

	        //collisions
	                    //player with tiles
            var dir = this.player.direction;
            if ((dir == RIGHT) & (this.map.hitTest(this.player.x+24,this.player.y + 16))){
            		this.player.moveSpeed = 0;
            }
            if ((dir == LEFT) & (this.map.hitTest(this.player.x+6,this.player.y + 16))){
            		this.player.moveSpeed = 0;
            }
			if ((dir == UP) & (this.map.hitTest(this.player.x + 16,this.player.y+12))){
            		this.player.moveSpeed = 0;
            }
            if ((dir == DOWN) & (this.map.hitTest(this.player.x+16,this.player.y + 32))){
            		this.player.moveSpeed = 0;
            }
            if ((dir == UP_RIGHT) & (this.map.hitTest(this.player.x+24,this.player.y+12))){
            		this.player.direction  = RIGHT;
            		this.player.moveSpeed = 0;
            }
            if ((dir == UP_LEFT) & (this.map.hitTest(this.player.x+8,this.player.y+8))){
            		this.player.direction  = LEFT;
            		this.player.moveSpeed = 0;
            }
            if ((dir == DOWN_LEFT) & (this.map.hitTest(this.player.x+6,this.player.y + 32))){
					this.player.direction  = LEFT;
					this.player.moveSpeed = 0;
            }
            if ((dir == DOWN_RIGHT) & (this.map.hitTest(this.player.x+24,this.player.y+32))){
          			this.player.direction = RIGHT;
          			this.player.moveSpeed = 0;
            }

            //player with npcs

            //move to another map?
            //convert player center position to tiles
            var tileX = Math.floor((this.player.x+16) / TILES_SIZE);
            var tileY = Math.floor((this.player.y+16) / TILES_SIZE);
            var numLevel = this.checkChangeMap(tileX,tileY,this.gates);
            if (numLevel > NO_GATE){
            	this.changeMapToLevel(numLevel);
            }

		},
		checkChangeMap: function(x,y,gates){
			// ATTENTION - (COL x ROW)
			return gates[y][x];
		},
		changeMapToLevel: function(numLevelTo){
			console.log("change to map " + numLevelTo);
			var startX = 0;
			var startY = 0;
			for (var i =0; i<startPosition.length;i++){
				var sp = startPosition[i];
				if ((sp.from == this.numLevel) && (sp.to == numLevelTo)){
						startX = sp.x * TILES_SIZE;
						startY = sp.y * TILES_SIZE;
				}
			}

			var scene = new MapScene(numLevelTo,startX,startY,null);
			game.replaceScene(scene);
		}
	});

    //CLASSES
	var Level = Class.create({
		initialize: function(tile,obj,collision){
			this.tile = tile;
			this.obj = obj;	
			this.collision = collision;
		}
	});

    var Player = Class.create(Sprite, {
    	initialize : function(x,y) {
    		Sprite.apply(this,[32, 32]);
	        this.image = Game.instance.assets['res/player.png'];
	        this.x = x;
	        this.y = y;
	        this.moveSpeed = 0;

	        //animate
	        this.animationDuration = 0;

	        this.direction = LEFT;
	        this.moving = false;
    	},
    	onenterframe: function(evt) {
			//moves
			if (this.moving){
				switch(this.direction){
					case UP: this.y -= this.moveSpeed;
							  break;
					case RIGHT : this.x += this.moveSpeed;
    						break;
					case UP_RIGHT : this.x += this.moveSpeed;
									this.y -= this.moveSpeed;
									break;
					case UP_LEFT :  this.x -= this.moveSpeed;
								    this.y -= this.moveSpeed;
								    break;
					case LEFT : this.x -= this.moveSpeed;
								break;
					case DOWN_LEFT : this.x -= this.moveSpeed;
									 this.y += this.moveSpeed;
									 break;
					case DOWN : this.y += this.moveSpeed;
								break;
					case DOWN_RIGHT : this.x += this.moveSpeed;
									 this.y += this.moveSpeed;
								break;
					default: break;
				}
			}

			//animation
			if (this.moving){
				this.animationDuration += evt.elapsed * 0.001;       
		        if (this.animationDuration >= playerSpriteSpeed) {
		        	var dir = this.direction;
		        	this.rotation = 0;
		        	if ((dir == UP) || (dir == UP_RIGHT) || (dir == UP_LEFT)){
		        		if (this.frame == 2){
		        			this.frame = 3;
		        		}
		        		else{
		        			this.frame = 2;
		        		}
		        	}

		        	if (dir == LEFT){
		        		if (this.frame == 4){
		        			this.frame = 5;
		        		}
		        		else{
		        			this.frame = 4;
		        		}
		        	}

		        	if (dir == RIGHT){
		        		if (this.frame == 6){
		        			this.frame = 7;
		        		}
		        		else{
		        			this.frame = 6;
		        		}
		        	}

		        	if ((dir == DOWN) || (dir == DOWN_RIGHT) || (dir == DOWN_LEFT)){
		        		if (this.frame == 0){
		        			this.frame = 1;
		        		}
		        		else{
		        			this.frame = 0;
		        		}
		        	}
		            
		            this.animationDuration -= playerSpriteSpeed;
		        }
			}else{
				this.animationDuration = 0;
			}

	        // Collisions with screen border
	        if (this.x > SCR_WIDTH - this.width){
	            this.x = SCR_WIDTH -this.width;
	        }
	        if (this.x <  0){
	            this.x =  0;
	        }
	        if (this.y > SCR_HEIGHT - this.height){
	            this.y = SCR_HEIGHT -this.height;
	        }
	        if (this.y < 0){
	            this.y = 0;
	        }

    	}
    });

    var Dialog = Class.create(Sprite, {
    	initialize : function(x,y) {
    		Sprite.apply(this,[320, 80]);
	        this.image = Game.instance.assets['res/dialog.png'];
			this.x = x;
	        this.y = y;
    	},
    	onenterFrame : function(evt){

    	}
    });

   	var NPC = Class.create(Sprite, {
    	initialize : function(tileX,tileY,img,dialog) {
    		Sprite.apply(this,[32, 32]);
	        this.image = Game.instance.assets[img];
			this.x = tileX * TILES_SIZE;
	        this.y = tileY * TILES_SIZE;
	        this.dialog = dialog;
	        this.timesTalked = 0;
    	},
    	onenterFrame : function(evt){

    	}
    });

};

