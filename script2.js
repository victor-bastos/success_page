document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userToken = urlParams.get('id'); // Aqui estamos assumindo que 'id' é o token do usuário

    // Defina o cabeçalho de autorização
    const headers = {
        'Authorization': `Bearer ${userToken}`
    };

    // Base URL da sua API
    const apiBaseUrl = 'https://glutt-42160c9da428.herokuapp.com';

    if (userToken) {
        fetch(`${apiBaseUrl}/user_from_token?token=${userToken}`, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(userData => {
            document.querySelector('header h2').textContent = userData.name;

            const userImageURL = userData.profile_picture;
            const userImageElement = document.querySelector('.pokemon-image');
            if (userImageElement) {
                userImageElement.src = userImageURL;
                userImageElement.alt = `Imagem de ${userData.name}`;
            }

            fetch(`${apiBaseUrl}/users/${userData.id}/diet_restrictions`, {
                method: 'GET',
                headers: headers
            })
            .then(response => response.json())
            .then(dietRestrictions => {
                const restrictionsSection = document.createElement('section');
                restrictionsSection.className = 'abilities';
                restrictionsSection.innerHTML = `<h3>Restrições Alimentares</h3>`;
                const restrictionsList = document.createElement('div');
                restrictionsList.className = 'accordion';

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

                // Inserir a seção de restrições alimentares após a imagem do usuário
                const mainElement = document.querySelector('main');
                mainElement.insertBefore(restrictionsSection, mainElement.querySelector('.pokemon-image').nextSibling);

                // Atualizar classes e eventos dos toggles
                restrictionsList.querySelectorAll('.toggle').forEach(toggle => {
                    toggle.addEventListener('click', function () {
                        this.classList.toggle('active');
                        this.nextElementSibling.classList.toggle('active');
                    });
                });
            })
            .catch(error => console.error('Falha ao buscar restrições alimentares do usuário:', error));
        })
        .catch(error => console.error('Falha ao buscar dados do usuário:', error));
    }
});
