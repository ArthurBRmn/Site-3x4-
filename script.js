const foto = document.getElementById("foto");
const preview = document.getElementById("preview");
const iconeFoto = document.getElementById("icone-foto");

const confirmar = document.getElementById("confirmar");
const remover = document.getElementById("remover");

let cropper;

foto.addEventListener("change", function () {

    const arquivo = foto.files[0];

    if (!arquivo) return;

    iconeFoto.style.display = "none";

    confirmar.style.display = "inline-block";
    remover.style.display = "inline-block";

    preview.src = URL.createObjectURL(arquivo);

    preview.onload = function () {

        if (cropper) {
            cropper.destroy();
        }

        cropper = new Cropper(preview, {
            aspectRatio: 3 / 4,
            viewMode: 1,
            autoCropArea: 0.8,
            responsive: true,
            cropBoxResizable: true
        });
    };
});


remover.addEventListener("click", function () {

    if (cropper) {
        cropper.destroy();
        cropper = null;
    }

    foto.value = "";

    preview.src = "";

    iconeFoto.style.display = "block";

    confirmar.style.display = "none";
    remover.style.display = "none";
});


confirmar.addEventListener("click", function () {

    if (!cropper) {
        alert("Selecione uma foto primeiro!");
        return;
    }

    const canvas = cropper.getCroppedCanvas({
        width: 300,
        height: 400
    });

    const imagem = canvas.toDataURL("image/jpeg");

    localStorage.setItem("foto3x4", imagem);

    window.open("resultado.html");

});
