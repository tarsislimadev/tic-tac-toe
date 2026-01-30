import { HTML } from "../components/html.js";
import { getTitle } from "../utils/get-title.js";
import { Peer } from "../utils/peer.js";
import { getGameId } from "../utils/get-game-id.js";

class TicTacToeGame extends HTML {
  onCreate() {
    super.onCreate();
    this.setText("game");
  }
}

export class Page extends HTML {
  onCreate() {
    super.onCreate();

    this.player = new Peer(getGameId());
    this.game = new TicTacToeGame();

    this.append(getTitle());
    this.append(this.game);
  }
}
