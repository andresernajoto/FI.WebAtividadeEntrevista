$(document).ready(function () {
    $('#CPFBeneficiario').mask('000.000.000-00');
    
    $(document).on('submit', '#formBeneficiario', function (e) {
        e.preventDefault();

        const nome = $('#NomeBeneficiario').val().trim();
        const cpf = $('#CPFBeneficiario').val().trim();
        const idCliente = $('#IdCliente').val();

        if (!idCliente) {
            BeneficiarioModal("Erro", "Cliente ainda não cadastrado. Salve o cliente antes de incluir beneficiários.");
            return;
        }

        if (!nome || !cpf) {
            BeneficiarioModal("Atenção", "Preencha todos os campos de beneficiário antes de incluir.");
            return;
        }

        $.ajax({
            url: urlBeneficiarioPost,
            method: "POST",
            data: {
                "NOME": nome,
                "CPF": $('#CPFBeneficiario').cleanVal(),
                "IDCLIENTE": idCliente
            },
            success: function (r) {
                BeneficiarioModal("Sucesso!", r)
                $("#formBeneficiario")[0].reset();
            },
            error: function (r) {
                if (r.status === 400)
                    BeneficiarioModal("Erro", r.responseJSON);
                else
                    BeneficiarioModal("Erro", "Erro interno no servidor.");
            }
        });
    });    
})

function BeneficiarioModal(titulo, texto) {
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
