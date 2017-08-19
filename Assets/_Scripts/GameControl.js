#pragma strict

public class GameControl extends MonoBehaviour{
	public static var instance: GameControl;

	public static function Instance(): GameControl{
		return instance;
	}
	function Awake(): void {
	instance= this;
	}
}
//
//function Update(){
//	if(Player_Controller.Instance().restart == true){
//		if(Input.GetKeyDown(KeyCode.R)){
//		SceneManager.LoadScene("TitleScreen");
//	}
//	}
//}
//}


	