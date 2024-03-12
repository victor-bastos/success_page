document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('active');
        });
    });

    // Extrai o ID do Pokémon da URL
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id'); // Supõe que a URL é algo como "pagina.html?id=25"

    // Busca o nome do Pokémon usando o ID
    // Busca o nome e a imagem do Pokémon usando o ID
    if (pokemonId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => response.json())
            .then(data => {
                const pokemonName = data.name;
                // Atualiza o nome do usuário para o nome do Pokémon
                document.querySelector('header h2').textContent = `${pokemonName}`;

                // Extrai a URL da imagem frontal padrão
                const pokemonImageURL = data.sprites.front_default;

                // Atualiza a imagem do Pokémon na página
                const pokemonImageElement = document.querySelector('.pokemon-image');
                if (pokemonImageElement) {
                    pokemonImageElement.src = pokemonImageURL;
                    pokemonImageElement.alt = `Imagem de ${pokemonName}`;
                }
            })
            .catch(error => console.error('Falha ao buscar dados do Pokémon:', error));
    }
});
