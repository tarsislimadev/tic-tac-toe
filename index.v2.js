import { HTML } from "./components/html.js";
import { ButtonComponent } from "./components/button-component.js";
import { getTitle } from "./utils/get-title.js";

import { goTo } from "./utils/go-to.js";

export class Page extends HTML {
  onCreate() {
    super.onCreate();
    this.append(getTitle());
    this.append(this.createPlayButton());
  }

  createPlayButton() {
    const button = new ButtonComponent();
    button.setText("play");
    button.setContainerStyle("display", "block");
    button.setContainerStyle("margin", "0 auto");
    button.setContainerStyle("text-align", "center");
    button.setContainerStyle("width", "10rem");
    const game_id = Date.now().toFixed(0);
    button.addEventListener("click", () => goTo("/game/", { game_id }));
    return button;
  }
}
