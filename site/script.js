document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");
    const nameInput = document.getElementById("name");
    const submitButton = document.querySelector("button");
    const errorContainer = document.getElementById("error-messages");

    phoneInput.value = "+998-";
    
    phoneInput.addEventListener("input", function (event) {
        let value = phoneInput.value.replace(/[^\d-]/g, ""); // Убираем все кроме цифр и дефисов
        
        if (!value.startsWith("+998-")) {
            value = "+998-" + value.replace(/^\+998-/, "");
        }
        
        // Ограничение на длину номера
        if (value.length > 19) {
            value = value.slice(0, 19);
        }
        
        // Проверка корректности формата во время ввода
        const phonePattern = /^\+998-\d{0,2}-?\d{0,3}-?\d{0,2}-?\d{0,2}$/;
        if (!phonePattern.test(value)) {
            value = phoneInput.dataset.prevValue || "+998-";
        }
        phoneInput.value = value;
        phoneInput.dataset.prevValue = value;
    });

    nameInput.addEventListener("input", function () {
        nameInput.value = nameInput.value.replace(/['";=<>]/g, "");
    });

    submitButton.addEventListener("click", function () {
        errorContainer.innerHTML = "";
        let isValid = true;
        
        const phonePattern = /^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/;
        const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

        if (!nameInput.value.trim()) {
            showError("Имя не может быть пустым!");
            nameInput.classList.add("error");
            isValid = false;
        } else if (!namePattern.test(nameInput.value)) {
            showError("Имя может содержать только буквы, пробелы и дефисы!");
            nameInput.classList.add("error");
            isValid = false;
        } else {
            nameInput.classList.remove("error");
        }

        if (!phonePattern.test(phoneInput.value)) {
            showError("Введите корректный номер в формате +998-XX-XXX-XX-XX");
            phoneInput.classList.add("error");
            isValid = false;
        } else {
            phoneInput.classList.remove("error");
        }
        
        if (isValid) {
            errorContainer.innerHTML = "<span style='color: green;'>Форма успешно отправлена!</span>";
        }
    });

    function showError(message) {
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.textContent = message;
        errorContainer.appendChild(errorMessage);
    }
});