document.addEventListener("DOMContentLoaded", () => {
  const btnEditar = document.getElementById("editar");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
 
  const nombre = document.getElementById("nombre");
  const telefono = document.getElementById("telefono");
  const correo = document.getElementById("correo");
  const ciudad = document.getElementById("ciudad");
  const fecha = document.getElementById("fecha");

  fetch("http://localhost:5001/getOneUser/" + id)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        nombre.value = user.nombre;
        telefono.value = user.telefono;
        correo.value = user.email;
        ciudad.value = user.ciudad;
        fecha.value = user.fecha.substring(0,10);

      });
    })
    .catch((error) =>
      console.error("Error al obtener datos de la API:", error)
    );

  btnEditar.addEventListener("click", () => {

    const data = {
      "id": id,
      "nombre": nombre.value,
      "telefono": telefono.value,
      "correo": correo.value,
      "ciudad": ciudad.value,
      "fecha": fecha.value
  }


    fetch("http://localhost:5001/actualizarUsuario/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        

        if (response.ok) {
          console.log("Datos enviados correctamente");
          window.location.href = "../view/index.html"
          
        } else {
          console.error("Error al enviar la solicitud:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  });
});
