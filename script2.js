document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const hashedToken = urlParams.get('id'); // Aqui estamos assumindo que 'id' é o token do usuário hasheado

    // Base URL da sua API
    const apiBaseUrl = 'https://glutt-42160c9da428.herokuapp.com';

    // Configuração dos cabeçalhos para incluir o token na solicitação
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${hashedToken}`);

    if (hashedToken) {
        // Chamada para o endpoint /user_from_token com o token hasheado
        fetch(`${apiBaseUrl}/user_from_token?hashed_token=${hashedToken}`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(userData => {
            // Atualiza o nome do usuário
            document.querySelector('header h2').textContent = userData.name;

            // Atualiza a imagem do usuário
            const userImageURL = userData.profile_picture;
            const userImageElement = document.querySelector('.pokemon-image');
            if (userImageElement) {
                userImageElement.src = userImageURL;
                userImageElement.alt = `Imagem de ${userData.name}`;
            }

            // Processa as restrições alimentares diretamente dos dados do usuário
            const restrictionsSection = document.createElement('section');
            restrictionsSection.className = 'abilities';
            restrictionsSection.innerHTML = `<h3>Restrições Alimentares</h3>`;
            const restrictionsList = document.createElement('div');
            restrictionsList.className = 'accordion';

            const dietRestrictions = [];
            if (userData.is_celiac) dietRestrictions.push('Doença Celíaca');
            if (userData.is_hashmoto) dietRestrictions.push('Tireoidite de Hashimoto');
            if (userData.is_diabetic) dietRestrictions.push('Diabetes');
            if (userData.is_vegan) dietRestrictions.push('Vegano');
            if (userData.is_vegetarian) dietRestrictions.push('Vegetariano');
            if (userData.is_lactose_intolerant) dietRestrictions.push('Intolerância à Lactose');

            dietRestrictions.forEach(restriction => {
                const item = document.createElement('div');
                item.className = 'item';
                const toggle = document.createElement('div');
                toggle.className = 'toggle';
                toggle.textContent = restriction;
                const content = document.createElement('div');
                content.className = 'content';
                content.innerHTML = `<p>${restriction}</p>`;
                item.appendChild(toggle);
                item.appendChild(content);
                restrictionsList.appendChild(item);
            });

            restrictionsSection.appendChild(restrictionsList);

            // Insere a seção de restrições alimentares após a imagem do usuário
            const mainElement = document.querySelector('main');
            mainElement.insertBefore(restrictionsSection, mainElement.querySelector('.pokemon-image').nextSibling);

            // Atualiza classes e eventos dos toggles
            restrictionsList.querySelectorAll('.toggle').forEach(toggle => {
                toggle.addEventListener('click', function () {
                    this.classList.toggle('active');
                    this.nextElementSibling.classList.toggle('active');
                });
            });
        })
        .catch(error => console.error('Falha ao buscar dados do usuário:', error));
    }
});
