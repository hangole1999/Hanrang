class ScriptBehavior extends Sup.Behavior {
  
  awake() {
    
    let mainCharacterActor = new Sup.Actor ( "Main Character" );
    new Sup.SpriteRenderer ( mainCharacterActor, "Leonard" );
    
    let cameraManActor = new Sup.Actor ( "CameraMan" );
    new Sup.Camera ( cameraManActor );
    
    mainCharacterActor.setPosition ( 0, 0, 0 );
    
    cameraManActor.setPosition ( 0, 0, 5 );
    
  }

  update() {
    
  }
  
}

Sup.registerBehavior(ScriptBehavior);
