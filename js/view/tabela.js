import * as ContatosController from "../controller/ContatosController.js";
import ContatoError from "../model/ContatoError.js";

/** @type {HTMLTableElement} */
const tabelaContatos = document.querySelector('#tabelaContatos');

// Espera todos os recursos estarem disponiveis, para executar depois, evitando
// assim bug de importação e loop de importação
// não é possivel colocar classe dentro do evento load
window.addEventListener('load', () => {
    exibirContatos();

});

export function exibirContatos()
{
    let tr = '';
    //let indice = 0; Para fazer com for ...of

    /* 
    // Desta forma não precisariamos do let indice e nem do indice++;
    // Forma antiga:
    // for(let contato of getContatos())
    for (let [indice, contato] of Object.entries(getContatos()))
    {
        tr += `
            <tr>
                <td> ${contato.nome} </td>
                <td> ${contato.telefone} </td>
                <td> 
                    <button class='btn btn-danger btn-sm' data-indice='${indice}'>
                        X
                    </button> 
                </td>
            </tr>
        `;
        indice++;
    } */

    const contatos = ContatosController.getContatos();

    contatos.forEach( (contato, indice) => {
        tr += `
            <tr>
                <td> ${contato.nome} </td>
                <td> ${contato.telefone} </td>
                <td> 
                    <button class='btn btn-danger btn-sm' data-indice='${indice}'>
                        X
                    </button> 
                </td>
            </tr>
        `
    } );

    tabelaContatos.innerHTML = tr;
}

tabelaContatos.addEventListener('click', (event) => {

    try {
        if(event.target.tagName == 'BUTTON') {
            let indice = event.target.dataset.indice;
            ContatosController.removerContato(indice);
            exibirContatos();
        }
    } catch (erro) {
        if (erro instanceof ContatoError){
            alert(erro);
        } else {
            alert('Erro ao remover o contato.')
            console.error(erro);
        }
    }
});