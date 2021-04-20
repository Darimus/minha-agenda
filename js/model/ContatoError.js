import Contato from './ContatoModel.js';

/**
 * @param {string} mensagem Mensagem de erro
 * @param {Contato} contato Objeto
 */
export default class ContatoError extends Error {
    constructor (mensagem, contato = null) {
        super(mensagem);
        this.contato = contato;
    }

    toString() {
        return this.message;
    }
}