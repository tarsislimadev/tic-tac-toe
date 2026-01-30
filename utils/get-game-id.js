export const getGameId = () => {
  const url = new URL(window.location);
  const game_id = url.searchParams.get("game_id");
  return +game_id;
};
