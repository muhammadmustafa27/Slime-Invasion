#pragma strict
     private var secondsCount: float;
     private var minuteCount: int;
     private var hourCount: int;

     private var time: float;
     public var timeText : UnityEngine.UI.Text;

     
 function Update(){
//         UpdateTimerUI();

	if(Player_Controller.Instance().Spa == true){
		var minutes = time / 60; //Divide the guiTime by sixty to get the minutes.
        var seconds = time % 60;//Use the euclidean division for the seconds.

        time += Time.deltaTime;
  //update the label value
         timeText.text = String.Format ("Time: {0:00} : {1:00}", minutes, seconds);
         }
     }
 //call this on update
     function  UpdateTimerUI(){
//         //set timer UI
//         secondsCount += Time.deltaTime;
//         timerText.text = hourCount +"h:"+ minuteCount +"m:"+secondsCount + "s";
//         if(secondsCount >= 60){
//             minuteCount++;
//             secondsCount = 0;
//         }else if(minuteCount >= 60){
//             hourCount++;
//             minuteCount = 0;
//         }    





     }