// Registrar usuario
document.getElementById("RegisterButtonUser").addEventListener("click", () => {
    const cedula = document.getElementById("cedula").value;
    const saldo = document.getElementById("saldo").value;
    const viajesDiarios = document.getElementById("viajesDiarios").value;
    const horarioFrecuente = document.getElementById("horarioFrecuente").value;
    const rutaMaxUtilizada = document.getElementById("rutaMaxUtilizada").value;

    if (!cedula || !saldo || !viajesDiarios || !horarioFrecuente || !rutaMaxUtilizada) {
        alert("All fields are required.");
        return;
    }

    const data = {
        cedula: cedula,
        saldo: saldo,
        viajesDiarios: viajesDiarios,
        horarioFrecuente: horarioFrecuente,
        rutaMaxUtilizada: rutaMaxUtilizada
    };

    fetch("http://localhost:3000/register", {
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