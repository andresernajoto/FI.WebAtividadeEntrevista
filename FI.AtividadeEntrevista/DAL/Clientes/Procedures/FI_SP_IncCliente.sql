﻿CREATE PROC FI_SP_IncClienteV2
    @NOME          VARCHAR (50) ,
    @SOBRENOME     VARCHAR (255),
    @CPF           VARCHAR (11) ,
    @NACIONALIDADE VARCHAR (50) ,
    @CEP           VARCHAR (9)  ,
    @ESTADO        VARCHAR (2)  ,
    @CIDADE        VARCHAR (50) ,
    @LOGRADOURO    VARCHAR (500),
    @EMAIL         VARCHAR (2079),
    @TELEFONE      VARCHAR (15)
AS
BEGIN
	INSERT INTO CLIENTES (NOME, SOBRENOME, CPF, NACIONALIDADE, CEP, ESTADO, CIDADE, LOGRADOURO, EMAIL, TELEFONE) 
	VALUES (@NOME, @SOBRENOME, @CPF, @NACIONALIDADE, @CEP, @ESTADO, @CIDADE, @LOGRADOURO, @EMAIL, @TELEFONE)

	SELECT SCOPE_IDENTITY()
END