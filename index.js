let p1= prompt("Enter player 1's Name "), p2= prompt("Enter player 2's name");

let rods= document.getElementsByClassName('rods'), rods_pos, score= 0;
rods[0].innerHTML= p1;
rods[1].innerHTML= p2;

let ball= document.getElementById('ball'), ball_top, ball_left;
let winner= false;
console.log(window.innerWidth);
if(localStorage.getItem('max_score')=== null){
localStorage.setItem('max_score', 0);
}

replaceBall();

// Placing ball after matches

function replaceBall(){
 
    rods_pos= (window.innerWidth/2)- 100;
    ball_left= (window.innerWidth/2)- (ball.offsetWidth/2);
    let start_msg= document.getElementById('start-message');
    start_msg.style.color= "white";
    
    ball_left= (window.innerWidth/2)- (ball.offsetWidth/2);
    ball.style.left= ball_left + "px";
    
    rods[0].style.left= rods_pos + "px";
    rods[1].style.left= rods_pos + "px";

    if(!winner){
        ball.style.transform= "rotate(180deg)";
        ball_top= rods[0].offsetHeight;
    }

    else{
        ball.style.transform= "rotate(0deg)";
        ball_top= window.innerHeight-(ball.offsetHeight + rods[0].offsetHeight);
    }
    ball.style.top= ball_top + "px";

}

// Handling start and rods


function handleButton(x){

    if(x.key== "Enter"){
        let start_msg= document.getElementById('start-message');
        start_msg.style.color= "transparent";

        if(!winner){
            down_right();
        }

        else{
            top_left();
        }
    }

    else if((x.key== 'a' || x.key== 'A' || x.key== 'ArrowLeft') && rods_pos-20 >= 0){
        rods_pos-= 20;
    }

    else if((x.key== 'd' || x.key== 'D' || x.key== 'ArrowRight') && rods_pos+210 <= window.innerWidth){
        rods_pos+= 20;
    }
    rods[0].style.left= rods_pos + "px";
    rods[1].style.left= rods_pos + "px";

    return ;
}

document.addEventListener("keydown", handleButton);

// Functions for ball motion

let speed= 5;

// Down Right
function down_right(){

    let inter= setInterval(function(){
        ball.style.transform= "rotate(-45deg)";

    if(ball.offsetTop >= window.innerHeight-(ball.offsetHeight + rods[0].offsetHeight)){

        if(ball.offsetLeft + ball.offsetWidth >= rods[0].offsetLeft && ball.offsetLeft + ball.offsetWidth- rods[0].offsetLeft <= 200){
                  score+= 100;
                  speed+= (speed/20);
                   clearInterval(inter);
                   top_right();
                   return;
        }

        else{
            console.log(window.innerHeight, ball.offsetHeight, ball_top);
            localStorage.setItem('max_score', Math.max(localStorage.getItem('max_score'), score));
            winner= true;
            speed= 5;
            alert(p1 + " won the game with score= "+ score+"\nMax score= "+localStorage.getItem('max_score'));
            score= 0;
            clearInterval(inter);
           replaceBall();
           return ;
        }
    }

    if(ball.offsetLeft + ball.offsetWidth >= window.innerWidth){
        clearInterval(inter);   
        down_left();
           return;
    }

    ball.style.top= ball_top + "px";
    ball.style.left= ball_left + "px";

    ball_left+= speed;
    ball_top+= speed;
    }, 40);
    return ;
}

// Top Left

function top_left(){

let inter= setInterval(function(){
    
    ball.style.transform= "rotate(135deg)";

    if(ball.offsetTop <= rods[0].offsetHeight){
    
        if(ball.offsetLeft >= rods[0].offsetLeft && ball.offsetLeft - rods[0].offsetLeft <= 200){
            score+= 100;
            speed+= (speed/20);
             clearInterval(inter);
             down_left();
             return;
  }

  else{
      localStorage.setItem('max_score', Math.max(localStorage.getItem('max_score'), score));
      winner= false;
      speed= 5;
      alert(p2 + " won the game with score= "+score +"\nMax score= "+ localStorage.getItem('max_score'));
      score= 0;
      clearInterval(inter);
     replaceBall();
     return ;
  }
    }
  if(ball_left<= 0){
      clearInterval(inter);
      top_right();
      return;
  }
  ball.style.top= ball_top + "px";
  ball.style.left= ball_left + "px";

  ball_left-= speed;
  ball_top-= speed;
     
}, 40);

return ;
}

// Top right

function top_right(){

    ball.style.transform= "rotate(-135deg)";
let inter= setInterval(function(){
      
    if(ball.offsetTop <= rods[0].offsetHeight){
    
        if(ball.offsetLeft + ball.offsetWidth >= rods[0].offsetLeft && ball.offsetLeft + ball.offsetWidth- rods[0].offsetLeft <= 200){
            score+= 100;
            speed+= (speed/20);
             clearInterval(inter);
             down_right();
             return;
  }

  else{
      localStorage.setItem('max_score', Math.max(localStorage.getItem('max_score'), score));
      winner= false;
      speed= 5;
      alert(p2 + " won the game with score= "+score +"\nMax score= "+ localStorage.getItem('max_score'));
      score= 0;
      clearInterval(inter);
     replaceBall();
     return ;
  }
    }
  if(ball.offsetLeft + ball.offsetWidth >= window.innerWidth){
      clearInterval(inter);
      top_left();
      return;
  }
  ball.style.top= ball_top + "px";
  ball.style.left= ball_left + "px";

  ball_left+= speed;
  ball_top-= speed;
   
}, 40);

return ;
}

// Down Left

function down_left(){

ball.style.transform= "rotate(45deg)";
let inter= setInterval(function(){
      
    if(ball.offsetTop >= window.innerHeight-(ball.offsetHeight + rods[0].offsetHeight)){
    
        if(ball.offsetLeft >= rods[0].offsetLeft && ball.offsetLeft - rods[0].offsetLeft <= 200){
            score+= 100;
            speed+= (speed/20);
             clearInterval(inter);
             top_left();
             return;
  }

  else{
      localStorage.setItem('max_score', Math.max(localStorage.getItem('max_score'), score));
      winner= true;
      speed= 5;
      alert(p1 + " won the game with score= "+score +"\nMax score= "+ localStorage.getItem('max_score'));
      score= 0;
      clearInterval(inter);
     replaceBall();
     return ;
  }
    }

  if(ball_left <= 0){
      clearInterval(inter);
      down_right();
      return;
  }
  ball.style.top= ball_top + "px";
  ball.style.left= ball_left + "px";

  ball_left-= speed;
  ball_top+= speed;
   
}, 40);

return ;
}