
    Player

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
		        if (this.animationDuration >= 0.08) {
		            this.frame = (this.frame + 1) % 4;
		            this.animationDuration -= 0.08;
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

    	},
    	setSpriteDirection: function(direction) {
    		this.rotation = 0;
    		switch (direction){
    			case RIGHT : this.rotate(180);
    						break;
				case UP_RIGHT : this.rotate(135);
							break;
				case UP : this.rotate(90);
							break;
				case UP_LEFT : this.rotate(45);
							break;
				case LEFT : this.rotate(0);
							break;
				case DOWN_LEFT : this.rotate(315);
							break;
				case DOWN : this.rotate(270);
							break;
				case DOWN_RIGHT : this.rotate(225);
							break;
				default: this.rotate(0);
    		}
    	}
    });
