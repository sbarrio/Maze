 //SCENES



	// MapScene
	var MapScene = Class.create(Scene, {
	    initialize: function() {
			//Scene vars
			var player;

			//Scene init
	    	Scene.apply(this);
        	var game = Game.instance;

        	//Loads player
        	player = new Player(0,0);
        	this.player = player;

        	//APPEND TO SCENE
			//adds player to the scene
        	this.addChild(player);
	    }
	    onenterframe: function(evt) {
	    	
	        var up = false;
	        var right = false;
	        var down = false;
	        var left = false;
	        //reset player movement
			this.player.moving = false;
			this.player.playerSpeed = 0;

			//Check input
			if(game.input.left && !game.input.right){
	            this.player.playerSpeed = playerSpeed;
	            left = true;
	            this.player.moving = true;
	        }
	        else if(game.input.right && !game.input.left){
	            this.player.playerSpeed = playerSpeed;
	            right = true;
	         	this.player.moving = true;
	        }
	        if(game.input.up && !game.input.down){
	            this.player.playerSpeed = playerSpeed;
	            up = true;
	            this.player.moving = true;
	        }
	        else if(game.input.down && !game.input.up){
	            this.player.playerSpeed = playerSpeed;
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
			//sets direction
			this.player.setSpriteDirection(this.player.direction);
		}
	});