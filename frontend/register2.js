// Registrar usuario
document.getElementById("RegisterButtonAlert").addEventListener("click", () => {
    const idAlertas = document.getElementById("idAlertas").value;
    const horariosRepetidos = document.getElementById("horariosRepetidos").value;
    const recargasMagicas = document.getElementById("recargasMagicas").value;

    if (!idAlertas || !horariosRepetidos || !recargasMagicas) {
        alert("All fields are required.");
        return;
    }

    const data = {
        idAlertas: idAlertas,
        horariosRepetidos: horariosRepetidos,
        recargasMagicas: recargasMagicas
    };

    fetch("http://localhost:3000/registerAlert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Registration failed.");
            }
        })
        .then(message => {
            alert(message);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while registering.");
        });
});