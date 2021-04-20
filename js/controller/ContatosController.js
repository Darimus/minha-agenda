import Contato from "../model/ContatoModel.js";
import ContatoError from "../model/ContatoError.js";
import * as tabelaContatos from "../view/tabela.js";

/** @type {Array<Contato>} */
const contatos = JSON.parse(localStorage.getItem('dados_contato')) || [];

export function adicionarContato(nome, telefone) {

    //ou if(!nome)
    if (nome === "") {
        throw new ContatoError('Nome é obrigatório');

    } else if (!telefone || telefone.length < 14) {
        throw new ContatoError('Telefone é obrigatório');

    }

    /* const infoContato = { 
        // caso o nome da propriedade e valor forem iguais
        // pode se resumir assim:
        // nome 

        nome: nome, 
        telefone: telefone
    };  */

    const infoContato = new Contato(nome, telefone);

    let posicaoContato = contatos.findIndex(c => c.nome.toUpperCase() == nome.toUpperCase());

    if (posicaoContato >= 0) {
        contatos[posicaoContato] = infoContato;

    } else {
        contatos.push(infoContato);
    }

    localStorage.setItem('dados_contato', JSON.stringify(contatos));//Adicionou no LocalStorage
    tabelaContatos.exibirContatos();
};

export function removerContato(indice) {
    if (isNaN(indice) || indice < 0 || indice >= contatos.length) {
        throw new ContatoError('Indice informado é invalido');
    } else {
        contatos.splice(indice, 1);
        localStorage.setItem('dados_contato', JSON.stringify(contatos));//Adicionou no LocalStorage

    }
}

export function getContatos() {
    return contatos;
}