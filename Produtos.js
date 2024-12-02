class Produtos {
    init(connection) {
        this.connection = connection;
        this.createTableProdutos();
    }

    async createTableProdutos() {
        const query = `CREATE TABLE IF NOT EXISTS Produtos (
        id int not null auto_increment, 
        nome varchar(90) not null, 
        valor decimal(10, 2) not null, 
        quantidade int not null, 
        fornecedor int not null,
        primary key(id), 
        foreign key(fornecedor) references Fornecedores(id));`;

        try {
            await this.connection.execute(query);
            console.log('Tabela criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar tabela:', error);
        }
    }
    
    async insertProdutos(req, res, connection) {
        const { nome, valor, quantidade, fornecedor } = req.body;

        try {
            const query = 'INSERT INTO Produtos (nome, valor, quantidade, fornecedor) VALUES (?, ?, ?, ?)';
            await connection.execute(query, [nome, valor, quantidade, fornecedor]);
            res.send('Dados inseridos com sucesso!');
          } catch (error) {
            console.error('Erro ao inserir dados:', error);
            res.status(500).send('Erro no servidor');
          }
    }
}

module.exports = Produtos;