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
- Deve ser possível listar todos os carros disponíveis.()
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria(category_id).
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo namo do carro.

**RN**
- O usuário não precisa estar logado no sistema.


# Cadastro de Especificação

**RF**
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadstrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser o administrador.

# Cadastro de Imagem

**RF**
- Deve ser possível cadastrar a imagem do carro
- Deve ser possível listar todos os carros.

**RNF**
- Utilizar o multer para upload dos arquivos.

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser o administrador.

# Aluguel de Carro

**RF**
- Deve ser possível cadastrar um aluguel.

**RN**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.