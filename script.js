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
    if (pokemonId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => response.json())
            .then(data => {
                const pokemonName = data.name;
                // Atualiza o nome do usuário para o nome do Pokémon
                document.querySelector('header h2').textContent = `Bem-vindo, ${pokemonName}`;
            })
            .catch(error => console.error('Falha ao buscar dados do Pokémon:', error));
    }
});
