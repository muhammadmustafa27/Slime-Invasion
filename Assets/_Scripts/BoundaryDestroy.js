#pragma strict

function OnTriggerExit(other: Collider){
	if(other.CompareTag("Bolt")) {
		Destroy(other.gameObject);
		boltmover.ammoShot = boltmover.ammoShot + 1;
	}
}