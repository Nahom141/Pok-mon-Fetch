async function fetchData() {
  const loader = document.getElementById("loader");
  const PokemonImg = document.getElementById("PokemonImg");
  const typeBadges = document.getElementById("typeBadges");
  loader.style.display = "block";
  PokemonImg.style.display = "none";
  typeBadges.innerHTML = "";
  try {
    const pokmonname = document
      .getElementById("pokmonName")
      .value.toLowerCase();
    const height = document.getElementById("height");
    const weight = document.getElementById("weight");
    const num = document.getElementById("number");
    const power = document.getElementById("power");
    const ability = document.getElementById("ability");
    const move = document.getElementById("move");
    const stat = document.getElementById("stat");
    const suggestions = document.getElementById("suggestions");

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokmonname}`
    );
    console.log(response);

    if (!response.ok) {
      throw new Error("Can't Fetch Data");
    }
    const data = await response.json();

    const sprites = data.sprites.front_default;
    const PokHeight = data.height;
    const PokWeight = data.weight;
    const PokNum = data.id;
    const PokAbility = data.abilities[0].ability.name;
    const Pokmove = data.moves.map((m) => m.move.name)[0];
    const Pokstat = data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    }));
    const types = data.types.map((t) => t.type.name);
    PokemonImg.src = sprites;
    PokemonImg.style.display = "block";
    height.textContent = `Height : ${PokHeight}`;
    weight.textContent = `Weight : ${PokWeight}`;
    move.textContent = `Move : ${Pokmove}`;

    ////stats

    stat.textContent = `Stats : ${Pokstat.map(
      (s) => `${s.name.charAt(0).toUpperCase() + s.name.slice(1)}: ${s.value}`
    ).join("| ")}`;

    ////ability
    ability.textContent = `Ability : ${
      PokAbility.charAt(0).toUpperCase() + PokAbility.slice(1)
    }`;
    ///////////////

    /////////////
    num.textContent = `ID : ${PokNum}`;
    power.textContent = ``;

    types.forEach((type) => {
      const badge = document.createElement("span");
      badge.className = `type-badge type-${type}`;
      badge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      typeBadges.appendChild(badge);
    });
  } catch (error) {
    const typeBadges = document.getElementById("typeBadges");
    typeBadges.innerHTML =
      '<span style="color:#ff5959">Pokémon not found!</span>';
    console.error(error);
  } finally {
    loader.style.display = "none";
  }
}

const searchInput = document.getElementById("pokmonName");
const suggestionsBox = document.getElementById("suggestions");
let allPokemonNames = [];

fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
  .then((res) => res.json())
  .then((data) => {
    allPokemonNames = data.results.map((p) => p.name);
  });

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  suggestionsBox.innerHTML = ""; // Clear previous

  if (value === "") return;

  const filtered = allPokemonNames
    .filter((name) => name.includes(value))
    .slice(0, 10);

  filtered.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    li.addEventListener("click", () => {
      searchInput.value = name;
      suggestionsBox.innerHTML = "";
    });
    suggestionsBox.appendChild(li);
  });
});
