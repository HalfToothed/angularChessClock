import { Component } from '@angular/core';

class Player {
  minutes: number;
  seconds: number;
  timer?: any;
  isRunning: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalTime: number = 0;
  isGameStarted = false;

  whitePlayer: Player = {
    minutes: 0,
    seconds: 0,
    isRunning: false
  };

  blackPlayer: Player = {
    minutes: 0,
    seconds: 0,
    isRunning: false
  };

  setTotalTime(value: string) {
    this.totalTime = Number(value);
    this.whitePlayer.minutes = this.totalTime;
    this.blackPlayer.minutes = this.totalTime;
  };

  startAndStopClock(isWhite: boolean) {
    debugger
    if (!this.isGameStarted && !isWhite) {
      return;
    } else {
      this.isGameStarted = true;
      const player = isWhite ? this.whitePlayer : this.blackPlayer;
      const secondPlayer = isWhite ? this.blackPlayer : this.whitePlayer;
      if (secondPlayer.isRunning) {
        return;
      }
      
      if (!player.isRunning) {
        player.isRunning = true;
        player.timer = setInterval(() => {
          if (player.minutes >= 0) {
            if (player.seconds > 0) {
              player.seconds = player.seconds - 1;
            }
            else {
              if (player.minutes == 0) {
                clearInterval(player.timer);
              }
              else {
                player.minutes = player.minutes - 1;
                player.seconds = 59;
              }
            }
          }
        }, 1000)
      } else {
        player.isRunning = false;
        clearInterval(player.timer);
        this.startAndStopClock(!isWhite);
      }
    }
  }

  reset() {
    this.totalTime = 0;
    this.resetPlayer(this.whitePlayer);
    this.resetPlayer(this.blackPlayer);
    this.isGameStarted = false;
  }

  resetPlayer(player: Player) {
    player.minutes = 0;
    player.seconds = 0;
    player.isRunning = false;
    clearInterval(player.timer);
  }
}
