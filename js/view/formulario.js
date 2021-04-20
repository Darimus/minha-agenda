import * as ContatosController from "../controller/ContatosController.js";
import ContatoError from "../model/ContatoError.js";

/** @type {HTMLInputElement} */
const inputNome = document.querySelector('#inputNome');
const inputTelefone = document.querySelector('#inputTelefone');


/** @type {HTMLButtonElement} */
const btnSalvar = document.querySelector('#btnSalvar');

btnSalvar.addEventListener('click', function () {
    try {
        // Guarde em memoria as informações vinda dos campos "Nome" e "Telefone" da interface;
        let nome = inputNome.value.trim();
        let telefone = inputTelefone.value.trim();

        ContatosController.adicionarContato(nome, telefone);
    }
    catch (erro) {
        if (erro instanceof ContatoError) {
            alert(erro)
        }
        else {
            alert('Erro inesperado ao adicionar ou atualizar seu contato!');
            console.error(erro);
        }
    }
});