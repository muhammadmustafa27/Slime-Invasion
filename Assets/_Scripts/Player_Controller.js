#pragma strict
import UnityEngine.SceneManagement;

public class Player_Controller extends MonoBehaviour{
	public static var instance: Player_Controller;
		public static function Instance(): Player_Controller{
		return instance;
		}

	function Awake(): void {
		instance= this;
	}

	var Walking : Animation;
	private var rb : Rigidbody;
	public var movementspeed: float;
	private var turnspeed = 100;
	var health= 3;
	var damage = 1;
	var wait_time=2;
	var loc = 0;

	//variable for shooting
	public var shot: GameObject;
	public var shotSpawn : Transform;
	public var firedelta: float= 0.4;
	private var nextFire : float = nextFire + 0.4;
	private var myTime : float = 0.0;

	//for scoring and gaming ..
	private var Score : int ;
	private var  GameOver : boolean;
	private var  Restart : boolean;
	public var ScoreText : UnityEngine.UI.Text;
	public var AccuracyText : UnityEngine.UI.Text;
	public var PHealthText : UnityEngine.UI.Text ;
	public var RestartText : UnityEngine.UI.Text;
	public var GameOverText : UnityEngine.UI.Text;
	public var TimeText : UnityEngine.UI.Text;

	//spawn
	public var hazard: GameObject;
	public var spawnWait: float;
	public var hazardcount: int;
	public var waveWait: float;
	public var spawnValues: Vector3;
	var myarray: GameObject [];


	public var  Spa : boolean;


		function Start () {


			rb= GetComponent.<Rigidbody>();
			Score = 0;
			GameOverText.text = "";
			RestartText.text = "";
			GameOver = false;
			Restart = false;
			Spa = true;
			UpdateScoreText();
			StartCoroutine(SpawnWaves());
		}


		function OnCollisionEnter(collision:Collision){
			if(collision.collider.tag == "Hazard" && loc == 0){
				Destroy(collision.collider.gameObject);
			//	Destroy(other.gameObject);
				DecreasingHealth();
			}

		}
		function SpawnWaves(){
			while(Spa){
				SpawnWave();
				yield WaitForSeconds(waveWait);
			}
		}


		function DecreasingHealth(){
			loc=1;
			health=health-damage;
			PHealthText.text = health.ToString();
			yield WaitForSeconds(wait_time);
			loc=0;
		}


		function FixedUpdate () {
			var moveVertical= Input.GetAxis("Vertical");
			var moveHorizontal= Input.GetAxis("Horizontal");
			var vector = Vector3(moveHorizontal, 0.0, moveVertical);
			rb.velocity = vector * movementspeed;
		}


		function Update () {

			if(Input.GetButton("Horizontal") || Input.GetButton("Vertical")) {
				Walking.GetComponent.<Animation>().Play("assault_combat_run");
				} else {
				Walking.GetComponent.<Animation>().Play("assault_combat_idle");
				}

			//print(Input.GetKeyDown(KeyCode.R));
			var turnspeed = 100;
			var playerPlane = new Plane(Vector3.up, transform.position);
			var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
			var hitdistance = 0.0;


			if (playerPlane.Raycast (ray, hitdistance)) {														//THIS IS NOT AN ORIGINAL SCRIPT (ABOVE) WE MADE.  
					var targetPoint = ray.GetPoint(hitdistance);												//THE LINK TO THE SOURCE IS http://answers.unity3d.com/questions/34701/need-help-with-making-player-look-at-mouse.html.  
	    			var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);				//Sowel is the original creator of this script.
				    transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, turnspeed * Time.deltaTime);
				    }

			if (health == 0){
				Spa = false;
				print("we lost");
				gameOver();
				Destroy(gameObject);
				print("Object destoyed");
				//restart(); 
			}
	   		
			//shot spawn script
	   		myTime += Time.deltaTime;
			if(( Input.GetButton("Fire1") || Input.GetKeyDown(KeyCode.Space)) && (myTime > nextFire) ){ //(Input.GetKeyDown(KeyCode.Space))
					Instantiate(shot , shotSpawn.position, shotSpawn.rotation);
					nextFire = myTime + firedelta; 
					nextFire = nextFire - myTime;
					myTime = 0;
			}
			ShowAccuracy();
		}

		function UpdateScore(i: int){
			Score = Score + i;
			UpdateScoreText();
		}

		function ShowAccuracy() {
			boltmover.accuracy = (100 * (boltmover.ammoHit / boltmover.ammoShot));
			AccuracyText.text = "Accuracy: " + boltmover.accuracy.ToString("F0") + "%";
		}

		function UpdateScoreText(){
			ScoreText.text = "Score: " + Score.ToString();
		}


		function gameOver(){
			GameOver = true;
			GameOverText.text = "GAME OVER";
			yield WaitForSeconds(5);
		}

		function restart(){
			Restart = true;
			RestartText.text = "Press 'R' to restart";
		}

		function SpawnWave () {
			for(var hazardshown:int = 0 ; hazardshown < hazardcount ; hazardshown++){
																	//	ran b/w   (-int , int )
				var spawnPosition:  Vector3 = Vector3(0,.5,48);//Vector3(Random.Range(-spawnValues.x, spawnValues.x),spawnValues.y, spawnValues.z);
				var spawnPosition2:  Vector3 = Vector3(0,.5,-48);
				var spawnRotation: Quaternion = Quaternion.identity;
				var spawnRotation2: Quaternion = Quaternion.Euler(0,180,0);
				Instantiate(myarray[Random.Range(0, myarray.length)], spawnPosition,  spawnRotation2);
				Instantiate(myarray[Random.Range(0, myarray.length)], spawnPosition2,  spawnRotation);
				yield WaitForSeconds(spawnWait);
			}
		}
	}