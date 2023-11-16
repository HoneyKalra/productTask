function createAlert(message, onClose) {
    const alert = document.createElement("div");
    alert.classList.add(
        "w-80", "h-32", "border-2", "bg-blue-600", "rounded", 
        "text-center", "text-white", "relative", "shadow-lg", "after:content-['']",
        "after:absolute", "after:left-0", "after:bottom-0", "after:w-full", 
        "after:h-1", "after:bg-blue-400", "after:animate-bottomslider"
    );
    alert.innerHTML = message;

    const cancelButton = createCancelButton(onClose);
    alert.appendChild(cancelButton);

    return alert;
}

function createCancelButton(onClick) {
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.classList.add(
        "border-2", "px-2", "rounded", "font-semibold", 
        "text-gray-500", "absolute", "bottom-2", "right-2", "bg-purple-100"
    );
    cancelButton.addEventListener("click", onClick);
    return cancelButton;
}

function removeElement(element) {
    element.remove();
}

function showAlert() {
    const btn = document.querySelector("#alertBtn-js");
    const main = document.querySelector("#alertbox-js");

    btn.addEventListener("click", () => {
        const onClose = () => {
            removeElement(alert);
        };

        const alert = createAlert("Alert Window", onClose);
        main.appendChild(alert);

        setTimeout(() => {
            removeElement(alert);
        }, 3000);
    });
}

showAlert();