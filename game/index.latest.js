import { TitleComponent } from "../components/title-component.js";

const app = document.getElementById("app");

const state = { clicks: [] };

const lines = [
  // horizontal
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // veritcal
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  // diagonal
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

const ee = new EventTarget();

ee.addEventListener("win", ({ value: { letter } }) => {
  text.innerText = letter + " wins";
});

ee.addEventListener("draw", () => {
  text.innerText = "Draw!";
});

ee.addEventListener("click", ({ value: { line, column, letter } }) => {
  state.clicks.push({ line, column, letter });
  update();
});

const createEvent = (name, value = null) => {
  const ev = new CustomEvent(name);
  if (value !== null) ev.value = value;
  return ev;
};

app.append(new TitleComponent());

const table = document.createElement("table");

app.appendChild(table);

const text = document.createElement("div");

app.appendChild(text);

const update = () => {
  Array.from(table.children).map((c) => c.remove());

  Array.from(Array(3)).map((_, line) => {
    const tr = document.createElement("tr");
    Array.from(Array(3)).map((_, column) => {
      const td = document.createElement("td");
      td.style.border = "1px solid #000";
      td.style.width = "3rem";
      td.style.height = "3rem";
      td.style.textAlign = "center";
      const pos = state.clicks.findIndex(
        (click) => click.line == line && click.column == column,
      );
      if (pos == -1) {
        td.addEventListener("click", () => {
          const letter = state.clicks.length % 2 == 0 ? "x" : "o";
          ee.dispatchEvent(
            createEvent("click", { line: line, column: column, letter }),
          );
          check(letter);
        });
      } else {
        td.innerText = pos % 2 == 0 ? "x" : "o";
      }

      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
};

const check = (letter) => {
  const clicks = state.clicks.filter((click) => click.letter == letter);

  const winner_line = lines.map((line) => {
    return line.every(([l, c]) =>
      clicks.find((click) => click.line == l && click.column == c),
    );
  });

  const ix = winner_line.findIndex(Boolean);

  if (ix != -1) {
    ee.dispatchEvent(createEvent("win", { letter }));
  } else {
    if (state.clicks.length == 9) {
      ee.dispatchEvent(createEvent("draw"));
    }
  }
};

update();
