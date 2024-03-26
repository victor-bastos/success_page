document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const currentToken = urlParams.get('id'); // Agora pega o token atual, não o hashedToken

    const apiBaseUrl = 'https://glutt-42160c9da428.herokuapp.com';
    const placeholder_img_url = "https://t3.ftcdn.net/jpg/06/33/54/78/240_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"

    if (currentToken) {
        fetch(`${apiBaseUrl}/token/user?current_token=${currentToken}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(userData => {
            console.log("O script foi carregado.");
            document.querySelector('header h2').textContent = userData.name; // Atualiza o nome do usuário

            const userImageElement = document.querySelector('.user-image');
            const placeholderImage = placeholder_img_url;
            const userImageURL = userData.profile_picture || placeholderImage;
            userImageElement.src = userImageURL;
            userImageElement.alt = `Imagem de ${userData.name}`;
            userImageElement.style.display = 'block';

            const restrictionsSection = document.createElement('section');
            restrictionsSection.className = 'restrictions';
            restrictionsSection.innerHTML = `<h3>Restrições alimentares</h3>`;
            const restrictionsList = document.createElement('div');
            restrictionsList.className = 'accordion';

            fetch(`${apiBaseUrl}/users/${userData.id}/diet_restrictions`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(dietRestrictions => {
                dietRestrictions.forEach(restriction => {
                    const item = document.createElement('div');
                    item.className = 'item';
                    const toggle = document.createElement('div');
                    toggle.className = 'toggle';
                    toggle.textContent = restriction;
                    const content = document.createElement('div');
                    content.className = 'content';
                    content.style.display = 'none'; // Inicialmente, oculta o conteúdo
                    content.innerHTML = `<p>Detalhes sobre ${restriction}.</p>`;
                    item.appendChild(toggle);
                    item.appendChild(content);
                    restrictionsList.appendChild(item);
                });

                restrictionsSection.appendChild(restrictionsList);
                const mainElement = document.querySelector('main');
                mainElement.insertBefore(restrictionsSection, mainElement.querySelector('.user-image').nextSibling);

                // Adiciona o evento de clique após os elementos serem criados
                restrictionsList.querySelectorAll('.toggle').forEach(toggle => {
                    toggle.addEventListener('click', function () {
                        this.classList.toggle('active');
                        const content = this.nextElementSibling;
                        content.style.display = content.style.display === 'block' ? 'none' : 'block';
                    });
                });
            })
            .catch(error => {
                console.error('Falha ao buscar restrições dietéticas:', error);
            });
        })
        .catch(error => {
            console.error('Falha ao buscar dados do usuário:', error);
        });
    }
});
