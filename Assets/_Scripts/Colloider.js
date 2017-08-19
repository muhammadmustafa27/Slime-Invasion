#pragma strict

public var enemyhealth: int;
public var ScoreValue: int = 1;
var SlimeLife : Animation;

function OnTriggerEnter(other: Collider) {

	if(other.tag == "Bolt") {
		Destroy(other.gameObject);
		enemyhealth = enemyhealth - 1; 
	}

}

function Update() {

	if(enemyhealth == 0) {
		Player_Controller.Instance().UpdateScore(ScoreValue);
		Destroy(gameObject);

	} else {
		SlimeLife.GetComponent.<Animation>().Play("slime_move");
	}
}