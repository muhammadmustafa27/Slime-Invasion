#pragma strict

public class boltmover extends MonoBehaviour{
	public static var instance: boltmover;
		public static function Instance(): boltmover{
		return instance;
		}

	function Awake(): void {
		instance= this;
	}

private var rb :Rigidbody;
public var speed: float;

//extra variables for accuracy
public static var accuracy: float;
public static var ammoHit: float = 0;
public static var ammoShot: float = 0;
//public var AccuracyText : UnityEngine.UI.Text;

function Start () {
	rb = GetComponent.<Rigidbody>();
	rb.velocity = transform.forward*speed;
}

//function Update() {
//	accuracy = Mathf.Round(100 * (ammoHit / ammoShot));
//	AccuracyText.text = "Accuracy: " + accuracy.ToString() + "percent";
//}

function OnTriggerEnter(other : Collider) {
	if(other.CompareTag ("Hazard")) {
		ammoShot = ammoShot + 1;
		ammoHit = ammoHit + 1;
	} 

}

}