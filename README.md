# Cadastro de Carro.

**RF**
- Deve ser possível cadastrar um novo carro.(OK)

**RNF**

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente.(OK)
- Ao ser cadastrado um carro já deve estar disponível por padrão.(OK)
- *O usuário responsável pelo cadastro deve ser o administrador.(OK)


# Listagem de Carro

**RF**
- Deve ser possível listar todos os carros disponíveis.(OK)
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria(category_id).(OK)
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.(OK)
- Deve ser possível listar todos os carros disponíveis pelo namo do carro.(OK)

**RN**
- O usuário não precisa estar logado no sistema.(OK)


# Cadastro de Especificação

**RF**
- Deve ser possível cadastrar uma especificação para um carro.

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.(OK)
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.(OK)
- O usuário responsável pelo cadastro deve ser o administrador.(OK)

# Cadastro de Imagem

**RF**
- Deve ser possível cadastrar a imagem do carro.(OK)
- Deve ser possível listar todos os carros.(OK)

**RNF**
- Utilizar o multer para upload dos arquivos.

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.(OK)
- O usuário responsável pelo cadastro deve ser o administrador.(OK)

# Aluguel de Carro.

**RF**
- Deve ser possível cadastrar um aluguel.(OK)

**RN**
- O aluguel deve ter duração mínima de 24 horas.(OK)
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.(OK)
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.(OK)
- O usuário deve estar logado na aplicação.(OK)
- Ao realizar um aluguel o status deverá ser alterado para indisponível.

# Devolução de carro.

**RF**
Deve ser possível realizar a devolução de um carro.

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na aplicação.

# Listagem de Alugueis para usuário

**RF**
Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**
O usuário deve estar logado na aplicação.