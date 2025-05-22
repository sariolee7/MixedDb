// Registrar usuario
document.getElementById("RegisterButtonTrans").addEventListener("click", () => {
    const idmediosTransporte  = document.getElementById("idmediosTransporte").value;
    const tipo = document.getElementById("tipo").value;
    const numRuta = document.getElementById("numRuta").value;
    const placa = document.getElementById("placa").value;
    const empresa = document.getElementById("empresa").value;

    if (!idmediosTransporte || !tipo || !numRuta || !placa || !empresa) {
        alert("All fields are required.");
        return;
    }

    const data = {
        idmediosTransporte: idmediosTransporte,
        tipo: tipo,
        numRuta: numRuta,
        placa: placa,
        empresa: empresa
    };

    fetch("http://localhost:3000/registerTrans", {
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