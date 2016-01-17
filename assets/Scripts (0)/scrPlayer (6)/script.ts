class ScrPlayerBehave extends Sup.Behavior {

  position: Sup.Math.Vector3;
  canJump = true;
  
  private speed = 6;
  private jumpSpeed = 30;
  private isDoubleJumpable = true;
  private isTextInputable = false;

  private shadow : Sup.Actor;

  private isRight = true;
  
  awake() {
    
    this.position = this.actor.getLocalPosition();

    // Set collider listener
    this.actor.cannonBody.body.addEventListener("collide", (event) => {
      
      // Only allow jumping if touching the floor
      if (event.contact.ni.y <= -1) { 
        
        this.canJump = true;
        
        if ( this.isRight )
          this.actor.spriteRenderer.setAnimation ( "Idle" );
        else
          this.actor.spriteRenderer.setAnimation ( "IdleL" );
        
      }
      
    });
    
  }

  start () {
        
    this.actor.spriteRenderer.setAnimation ( "Idle" );
    
    //this.shadow = this.actor.getChild ( "Shadow" );
    
  }

  update() {
    
    // TextInputable
    if ( Sup.Input.wasKeyJustPressed ( "RETURN" ) )
      this.isTextInputable = !this.isTextInputable;
    
    
    //
    let velocity = this.actor.cannonBody.body.velocity;
    
    velocity.y = Sup.Math.lerp ( velocity.y, -30.625, 0.05 );
    
    
    // is Text Inputable
    if ( this.isTextInputable ) {
      
      if ( velocity.x != 0 ) velocity.x = Sup.Math.lerp ( velocity.x, 0, 0.25 );
      
    // is not Text Inputable
    } else {
    
      // Horizontal velocity
      if ( Sup.Input.isKeyDown ( "LEFT" ) ) {
        
        velocity.x = -this.speed;
        
        if ( this.isRight )
          this.isRight = false;
        
      }

      else if ( Sup.Input.isKeyDown ( "RIGHT" ) ) {
      
        velocity.x = this.speed;
        
        if ( !this.isRight )
          this.isRight = true;
      
      }

      else
        velocity.x = Sup.Math.lerp ( velocity.x, 0, 0.25 );
      
      
      // vertical velocity
      if ( Sup.Input.isKeyDown ( "UP" ) )
        velocity.z = -this.speed / 3 * 2;

      else if ( Sup.Input.isKeyDown ( "DOWN" ) )
        velocity.z = this.speed / 3 * 2;

      else
        velocity.z = Sup.Math.lerp ( velocity.z, 0, 0.25 );


      // Up velocity
      if ( Sup.Input.wasKeyJustPressed ( 'V' ) )
        if ( this.canJump||1 ) {

          this.actor.cannonBody.body.velocity.y = this.jumpSpeed;
          this.isDoubleJumpable = true;
          this.canJump = false;
        
          if ( this.isRight )
            this.actor.spriteRenderer.setAnimation ( "Jump" );
          else 
            this.actor.spriteRenderer.setAnimation ( "JumpL" );

        } else if ( this.isDoubleJumpable ) {

          this.actor.cannonBody.body.velocity.y = this.jumpSpeed;
          this.isDoubleJumpable = false;
        
          if ( this.isRight )
            this.actor.spriteRenderer.setAnimation ( "Jump" );
          else 
            this.actor.spriteRenderer.setAnimation ( "JumpL" );

        }


      // Down velocity
      if ( Sup.Input.wasKeyJustPressed ( 'Z' ) )
        velocity.y = -this.jumpSpeed;
      
    }
    
    let currentAnimation = this.actor.spriteRenderer.getAnimation ();
    let setAnimation = currentAnimation;
    
    if ( this.isRight ) {
      
      if ( currentAnimation != "Jump" && currentAnimation != "JumpL" ) {
      
        if ( Math.abs ( velocity.x ) > 1 || Math.abs ( velocity.z ) > 1 ) {

          setAnimation = "Run";

        } else if ( currentAnimation != "Jump" ) {

          setAnimation = "Idle";

        }
        
      } else if ( currentAnimation == "JumpL" ) {
        
        setAnimation = "Jump"
        
      }
      
    } else {
      
      if ( currentAnimation != "Jump" && currentAnimation != "JumpL" ) {
      
        if ( Math.abs ( velocity.x ) > 1 || Math.abs ( velocity.z ) > 1 ) {

          setAnimation = "RunL";

        } else if ( currentAnimation != "JumpL" ) {

          setAnimation = "IdleL";

        }
        
      } else if ( currentAnimation == "Jump" ) {
        
        setAnimation = "JumpL"
        
      }
    
    }
    
    this.actor.spriteRenderer.setAnimation ( setAnimation );
    
    
    // Set velocity
    this.actor.cannonBody.body.velocity = velocity;
      
  }
  
}

Sup.registerBehavior(ScrPlayerBehave);
