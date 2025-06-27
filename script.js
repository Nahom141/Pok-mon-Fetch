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
    const types = data.types.map((t) => t.type.name);
    PokemonImg.src = sprites;
    PokemonImg.style.display = "block";
    height.textContent = `Height : ${PokHeight}`;
    weight.textContent = `Weight : ${PokWeight}`;
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
