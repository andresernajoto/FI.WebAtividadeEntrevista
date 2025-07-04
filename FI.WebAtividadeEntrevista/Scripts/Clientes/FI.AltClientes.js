﻿
$(document).ready(function () {
    $('#CPF').prop('readonly', true);
    $('#CEP').mask('0000-000');

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
    }

    $('#Telefone').mask('(00) 00000-0000');
    $('#CPF').mask('000.000.000-00');

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").cleanVal(),
                "CPF": $(this).find("#CPF").cleanVal()
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formCadastro")[0].reset();
                    window.location.href = urlRetorno;
                }
        });
    })

})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function listarBeneficiarios(idCliente) {
    $.ajax({
        url: urlBeneficiariosList,
        method: 'POST',
        data: {
            jtStartIndex: 0,
            jtPageSize: 999,
            jtSorting: 'NOME ASC'
        },
        success: function (data) {
            if (data.Result === "OK") {
                var tabela = $('#tabelaBeneficiarios tbody');
                tabela.empty(); // Limpa tabela

                data.Records.forEach(function (item) {
                    if (item.IdCliente === parseInt(idCliente)) {
                        var linha = `
                            <tr>
                                <td style="width: 30%;">${formatarCpf(item.CPF)}</td>
                                <td style="width: 40%;">${item.Nome}</td>
                                <td style="width: 30%;">
                                    <button class="btn btn-primary btn-md" onclick="editarBeneficiario(${item.ID})">Alterar</button>
                                    <button class="btn btn-primary btn-md" onclick="excluirBeneficiario(${item.ID})">Excluir</button>
                                </td>
                            </tr>
                        `;
                        tabela.append(linha);
                    }
                });
            } else {
                alert(data.Message);
            }
        },
        error: function () {
            alert("Erro ao carregar beneficiários.");
        }
    });
}

function abrirModalBeneficiarios(idCliente) {
    $('#IdCliente').val(idCliente);
    listarBeneficiarios(idCliente);
    $('#modalBeneficiarios').modal('show');
}

function formatarCpf(cpf) {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}