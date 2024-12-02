class Fornecedores {
    init(connection) {
        this.connection = connection;
        this.createTableFornecedores();
    }

    async createTableFornecedores() {
        const query = `CREATE TABLE IF NOT EXISTS Fornecedores (
        id int not null auto_increment, 
        nome varchar(90) not null, 
        cpf_cnpj varchar(60) not null, 
        email varchar(100) not null, 
        telefone varchar(20) not null,
        endereco varchar(190) not null,
        primary key(id));`;

        try {
            await this.connection.execute(query);
            console.log('Tabela criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar tabela:', error);
        }
    }
    
    async insertFornecedores(req, res, connection) {
        const { nome, cpfCnpj, email, telefone, endereco } = req.body;

        try {
            const query = 'INSERT INTO Fornecedores (nome, cpf_cnpj, email, telefone, endereco) VALUES (?, ?, ?, ?, ?)';
            await connection.execute(query, [nome, cpfCnpj, email, telefone, endereco]);
            res.send('Dados inseridos com sucesso!');
          } catch (error) {
            console.error('Erro ao inserir dados:', error);
            res.status(500).send('Erro no servidor');
          }
    }

    async getAllFornecedores(connection) {
        try {
            const [rows] = await connection.query('SELECT * FROM Fornecedores;');
            return rows;
        } catch (error) {
            console.error('Erro ao buscar fornecedores:', error);
            throw error;
        }
    }

    async updateFornecedores(connection, req, res) {
        const id = req.params.id;
        const { nome, cpfCnpj, email, telefone, endereco } = req.body;

        try {
            const query = 'UPDATE Fornecedores set nome = ?, cpf_cnpj = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?;';
            await connection.execute(query, [nome, cpfCnpj, email, telefone, endereco, id]);
            res.send('Dados atualizados com sucesso!');
          } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            res.status(500).send('Erro no servidor');
          }
    }

    async deleteFornecedores(connection, req, res) {
        const id = req.params.id;

        try {
            const query = 'DELETE FROM Fornecedores WHERE id = ?;';
            await connection.execute(query, [id]);
            res.send('Dados excluidos com sucesso!');
          } catch (error) {
            console.error('Erro ao excluir dados:', error);
            res.status(500).send('Erro no servidor');
          }
    }
}

module.exports = Fornecedores;