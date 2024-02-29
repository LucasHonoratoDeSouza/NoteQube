(function(window, document, undefined) {
    window.onload = function() {
        const inputB = document.querySelector('.notes__body').value
        var btnc = document.getElementById("copy");
        if (btnc) {
            btnc.addEventListener("click", ()=>{
                navigator.clipboard.writeText(inputB) 
            })
        }     
    };
})(window, document, undefined);


document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById('textarea');
    const contador = document.getElementById('counter');

    function atualizarContador() {
        const conteudo = textarea.value.trim();
        const palavras = conteudo.split(/\s+/).filter(word => word !== '');
        contador.textContent = conteudo.length;
    }

    textarea.addEventListener('input', atualizarContador);
});





