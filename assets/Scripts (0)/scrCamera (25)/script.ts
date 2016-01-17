class ScrCameraBehavior extends Sup.Behavior {
  
  player = Sup.getActor ( "Main Character" );

  update() {
    
    this.actor.lookAt ( this.player.getPosition() );
    
    this.actor.setPosition ( 
      Sup.Math.lerp ( this.player.getPosition().x, this.actor.getPosition().x, 0.5 ), 
      Sup.Math.lerp ( this.player.getPosition().y, this.actor.getPosition().y, 0.3 ) + 1, 
      Sup.Math.lerp ( this.player.getPosition().z, this.actor.getPosition().z, 0.3 ) + 2.7
    );
    
  }
  
}

Sup.registerBehavior(ScrCameraBehavior);