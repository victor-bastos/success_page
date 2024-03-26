document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const currentToken = urlParams.get('id'); // Agora pega o token atual, não o hashedToken

    const apiBaseUrl = 'https://glutt-42160c9da428.herokuapp.com';
    const placeholder_img_url = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0TBg4PEBENEBAQDRARDw4QDg8NDQ0QFRUWFhYRFhMYHSggGBolJxUTJDEhJSkrLi8uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADcQAQACAAMFBAgEBgMAAAAAAAABAgMEEQUhMUFREmFxwTJicoGRobHhEyJS0TM0QpLw8SMkQ//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2tZmdIiZnpG+QeDqw9n40/06eMxDfGyb87V+EyCOEjOyb8rV+Ew04mzcaOUW8JjzByD29JidJiYnpMaPAAAAAAAAAAAAAAAAAAAAACOL2sTNoiI1meEdU1kMlFK9qd9+vKvdAObK7MmY1xN3qxx98pPCwq1rpWIiO5mAAAAAxxMOs10tETHfGqNzWy+eH/AGz5SlAFYtWYtMTumOMTyeJ7O5Ot69LRwt5Sg8Sk1vNZjSY4gxAAAAAAAAAAAAAAAABuyeD28xWvLjPhAJDZWV0p+JbjPo90dfeknkRuegAAAAAAAAOLaWV7WH2oj81Y+MdHaAq46to4HZzM6cLb47usOUAAAAAAAAAAAAAABK7Gw/y3t1nSPrPkik9syumSr36z85B1AAAAAAAAAAAA4Nr4euWi36bfKd37IZYs5XXKXj1Z+W9XQAAAAAAAAAAAAAAFg2f/ACdPZV9O7Ltrk690zHz+4OsAAAAAAAAAAAGvMfwL+zb6K2sOetpk7z6sx8dyvAAAAAAAAAAAAAAAJPYuLvtT3x5+SMbMvizXGraOU/GOYLIMaWiaxMb4mNYZAAAAAAAAAATII7bOLphVr1nWfCEQ353H7eYm3LhXwhoAAAAAAAAAAAAAAAABJbKzek/h24T6M9J6JZV0rkNoboped/K3Ke6QSYAAAAAAACN2rm9K/h14z6U9I6M8/n4rE1pvtznlX7oaZ3gAAAAAAAAAAAAAAAAAAM8LBta2lYmZ+UeMuvJ7OtbffWten9U/sl8LCrWmlYiIBpyWBemHpa3a6Ryr73SAAAAADTmsK1sLStprPXr3NwCuY+XvS2lo8J41n3tSzXpE1mJiJieU74Rec2ZMfmw9/q8/cCNCeIAAAAAAAAAAAAAD2tZm0RG+Z4R1ArWZtERvmeEJfI7Piulr6TblHGK/dsyOTildZ0m88Z6d0OwAAAAAAAAAAAAHHncjW8axpFuvKfFC4mHat5raNJhZnPm8rW9N+6Y4W6fYFfGeLh2riTW26YYAAAAAAAAAAAJnZuU7NO1b0pj+2Oni5NlZbtYvbnhXh32TQAAAAAAAAAAAAAAAAOXP5WL4frR6M+SCmJidJ3TG6Y6LOitrZb/0jwt5SCMAAAAAAAAIjfp1HXsvC7WbieVY7X7AmMthRXAivSN/fPOW0AAAAAAAAAAAAAAAAAGOJSJw5ieExpLIBWcXDmuJNZ4xOn3YpDbGFpjVt+qNJ8Y/z5I8AAAAAABLbFp/xWt1tp7o/wBolP7Pppk6d8a/HeDpAAAAAAAAAAAAAAAAAAABx7Vw9cpM/pmJ8vNBrJj01wbV61mFbAAAAAAAWXCrphVjpWI+St0j88eMfVZwAAAAAAAAAAAAAAAAAAAAFZxa6Yto6WmPmsyu52P+3ie1INIAAAAAMsH+NX2o+qzAAAAAAAAAAAAAAAAAAAAAAr2f/nL+15QANAAAAP/Z"

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

            const userImageElement = document.querySelector('.pokemon-image');
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
                mainElement.insertBefore(restrictionsSection, mainElement.querySelector('.pokemon-image').nextSibling);

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
