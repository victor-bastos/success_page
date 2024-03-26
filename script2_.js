document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('active');
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    if (pokemonId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => response.json())
            .then(data => {
                const pokemonName = data.name;
                document.querySelector('header h2').textContent = `${pokemonName}`;

                const pokemonImageURL = data.sprites.front_default;
                const pokemonImageElement = document.querySelector('.pokemon-image');
                if (pokemonImageElement) {
                    pokemonImageElement.src = pokemonImageURL;
                    pokemonImageElement.alt = `Imagem de ${pokemonName}`;
                }

                const abilitiesSection = document.createElement('section');
                abilitiesSection.className = 'abilities';
                abilitiesSection.innerHTML = `<h3>Restrições alimentares</h3>`;
                const abilitiesList = document.createElement('div');
                abilitiesList.className = 'accordion';

                const abilitiesPromises = data.abilities.map((ability) => {
                    return fetch(ability.ability.url)
                        .then(response => response.json())
                        .then(abilityData => {
                            const abilityDescription = abilityData.effect_entries.find(entry => entry.language.name === 'en').effect;
                            const item = document.createElement('div');
                            item.className = 'item';
                            const toggle = document.createElement('div');
                            toggle.className = 'toggle';
                            toggle.textContent = ability.ability.name;
                            const content = document.createElement('div');
                            content.className = 'content';
                            content.innerHTML = `<p>${abilityDescription}</p>`;
                            item.appendChild(toggle);
                            item.appendChild(content);
                            return item;
                        });
                });

                Promise.all(abilitiesPromises).then(items => {
                    items.forEach(item => abilitiesList.appendChild(item));
                    abilitiesSection.appendChild(abilitiesList);

                    // Inserir a seção de habilidades após a imagem do Pokémon
                    const mainElement = document.querySelector('main');
                    mainElement.insertBefore(abilitiesSection, mainElement.querySelector('.pokemon-image').nextSibling);

                    // Atualizar classes e eventos dos toggles
                    abilitiesList.querySelectorAll('.toggle').forEach(toggle => {
                        toggle.addEventListener('click', function () {
                            this.classList.toggle('active');
                            this.nextElementSibling.classList.toggle('active');
                        });
                    });
                });
            })
            .catch(error => console.error('Falha ao buscar dados do Pokémon:', error));
    }
});
