document.addEventListener("DOMContentLoaded", () => {

    // === 1. ПАДАЮЧІ КАРТИНКИ (index.html) ===
    const header = document.getElementById('main-header');
    
    if (header) {
        // Знаходимо висоту великої літери (приблизно)
        const h1 = header.querySelector('h1');
        const fontSize = parseFloat(window.getComputedStyle(h1).fontSize);
        const maxImgHeight = fontSize * 2; // Не більше подвоєної висоти

        // Список картинок (вони мають бути у папці images)
        const imagesSrc = ['images/sofa.jpg', 'images/chair.jpg', 'images/desk.jpg']; 

        function spawnImage() {
            const img = document.createElement('img');
            img.src = imagesSrc[Math.floor(Math.random() * imagesSrc.length)];
            img.className = 'falling-img';
            img.style.height = maxImgHeight + 'px';
            
            // Випадкова позиція по горизонталі
            img.style.left = Math.random() * (header.clientWidth - 50) + 'px';
            
            header.appendChild(img);

            // Анімація падіння
            let topPos = -maxImgHeight;
            const speed = 2 + Math.random() * 2; // Швидкість

            const timer = setInterval(() => {
                topPos += speed;
                img.style.top = topPos + 'px';

                // Видаляємо, коли долетить до низу
                if (topPos > header.clientHeight) {
                    clearInterval(timer);
                    if(img.parentElement) img.remove();
                }
            }, 20);
        }

        // Запуск раз на 1.5 секунди
        setInterval(spawnImage, 1500);
    }

    // === 2. ДРУКУЮЧИЙСЯ ТЕКСТ "НОВИНКА!" (catalog.html) ===
    const typingSpan = document.getElementById('typing-text');
    if (typingSpan) {
        const textToType = " Новинка!";
        let charIndex = 0;

        function type() {
            if (charIndex < textToType.length) {
                typingSpan.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 150);
            } else {
                // Пауза і перезапуск
                setTimeout(() => {
                    typingSpan.textContent = "";
                    charIndex = 0;
                    type();
                }, 2000);
            }
        }
        type();
    }

    // === 3. ПОШУК ТОВАРІВ (catalog.html) ===
    const searchInput = document.getElementById('search-input');
    const productContainer = document.getElementById('product-list');

    if (searchInput && productContainer) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = productContainer.querySelectorAll('.product-card');

            cards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                if (title.includes(term)) {
                    card.style.display = "inline-block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // === 4. ТУЛТІП ТА ЕФЕКТИ (feedback.html) ===
    const detailsArea = document.getElementById('details-area');
    const tooltipMsg = document.getElementById('tooltip-msg');

    if (detailsArea && tooltipMsg) {
        detailsArea.addEventListener('mouseover', () => {
            // Змінюємо стиль поля
            detailsArea.style.backgroundColor = "#f0f8ff";
            detailsArea.style.border = "2px solid blue";
            detailsArea.style.boxShadow = "3px 3px 5px rgba(0,0,0,0.3)";
            
            // Показуємо підказку
            tooltipMsg.style.display = "block";
        });

        detailsArea.addEventListener('mouseout', () => {
            // Скидаємо стилі
            detailsArea.style.backgroundColor = "";
            detailsArea.style.border = "";
            detailsArea.style.boxShadow = "";
            
            // Ховаємо підказку
            tooltipMsg.style.display = "none";
        });
    }
});