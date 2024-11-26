document.addEventListener("DOMContentLoaded", () => {
    const elementoInput = document.getElementById("elemento");
    const descripcionTextarea = document.getElementById("descripcion");
    const fechaInput = document.getElementById("fecha-seleccionada");
    const listaHoras = document.getElementById("lista-horas");
    const btnReservar = document.querySelector(".btn-reservar");

    let reservaSeleccionada = {};

    const generarFechasYHoras = () => {
        const fechas = {};
        const hoy = new Date();
        for (let i = 0; i < 3; i++) {
            const fecha = new Date(hoy);
            fecha.setDate(hoy.getDate() + i);
            const key = fecha.toISOString().split("T")[0];
            fechas[key] = [
                { hora: "9:00", estado: "disponible" },
                { hora: "10:00", estado: "reservado" },
                { hora: "11:00", estado: "disponible" },
            ];
        }
        return fechas;
    };

    const horas = generarFechasYHoras();

    const toggleBotonReservar = (mostrar) => {
        btnReservar.style.display = mostrar ? "block" : "none";
    };

    const cargarHoras = (fecha) => {
        listaHoras.innerHTML = "";
        toggleBotonReservar(false);
        const horasDisponibles = horas[fecha] || [];
        horasDisponibles.forEach((hora) => {
            const li = document.createElement("li");
            li.textContent = hora.hora;
            li.classList.add(hora.estado === "disponible" ? "disponible" : "reservado");
            if (hora.estado === "disponible") {
                li.addEventListener("click", () => {
                    document.querySelectorAll("#lista-horas li").forEach((item) => item.classList.remove("seleccionada"));
                    li.classList.add("seleccionada");
                    reservaSeleccionada = {
                        elemento: elementoInput.value,
                        descripcion: descripcionTextarea.value,
                        fecha,
                        hora: hora.hora,
                    };
                    toggleBotonReservar(true);
                });
            }
            listaHoras.appendChild(li);
        });
    };

    const hoy = new Date();
    const hoyISO = hoy.toISOString().split("T")[0];
    fechaInput.min = hoyISO;
    fechaInput.value = hoyISO;
    cargarHoras(hoyISO);

    fechaInput.addEventListener("change", () => {
        cargarHoras(fechaInput.value || hoyISO);
    });

    btnReservar.addEventListener("click", () => {
        const modal = new bootstrap.Modal(document.getElementById("confirmacionModal"));
        document.getElementById("modal-elemento").textContent = reservaSeleccionada.elemento;
        document.getElementById("modal-descripcion").textContent = reservaSeleccionada.descripcion;
        document.getElementById("modal-fecha").textContent = reservaSeleccionada.fecha;
        document.getElementById("modal-hora").textContent = reservaSeleccionada.hora;
        modal.show();
    });

    document.getElementById("btn-confirmar").addEventListener("click", () => {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        reservas.push(reservaSeleccionada);
        localStorage.setItem("reservas", JSON.stringify(reservas));
        window.location.href = "/frontend/html/homeUser.html";
    });

    elementoInput.value = localStorage.getItem("elementoSeleccionado") || "";
    descripcionTextarea.value = localStorage.getItem("descripcionSeleccionada") || "";
});
