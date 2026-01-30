import { H1 } from "../components/h1.js";

const getTitle = () => {
  const h1 = new H1();
  h1.setText("Tic Tac Toe");
  h1.setStyle('text-align', 'center')
  return h1;
};

export { getTitle };
