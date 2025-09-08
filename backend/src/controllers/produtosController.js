const db = require('../database/connection');

// Rota para obter todos os produtos ativos
exports.getProdutos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM produtos WHERE ativo = TRUE');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Rota para adicionar um novo produto e associar a fornecedores
exports.addProduto = async (req, res) => {
    const { nome_produto, sku, descricao, quantidade_em_estoque, preco_unitario, fornecedores } = req.body;
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const sqlProduto = 'INSERT INTO produtos (nome_produto, sku, descricao, quantidade_em_estoque, preco_unitario) VALUES (?, ?, ?, ?, ?)';
        const [resultProduto] = await connection.query(sqlProduto, [nome_produto, sku, descricao, quantidade_em_estoque, preco_unitario]);
        const idProduto = resultProduto.insertId;

        if (fornecedores && fornecedores.length > 0) {
            const sqlFornecedores = 'INSERT INTO produtos_fornecedores (produto_id, fornecedor_id) VALUES ?';
            const valores = fornecedores.map(fornecedorId => [idProduto, fornecedorId]);
            await connection.query(sqlFornecedores, [valores]);
        }

        await connection.commit();
        res.status(201).json({ message: 'Produto e fornecedores associados com sucesso!' });
    } catch (error) {
        await connection.rollback();
        console.error('Erro ao adicionar produto e fornecedores:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    } finally {
        connection.release();
    }
};

// Rota para atualizar um produto
exports.updateProduto = async (req, res) => {
    const { id } = req.params;
    const { nome_produto, sku, descricao, preco_unitario } = req.body;
    try {
        const [result] = await db.query('UPDATE produtos SET nome_produto = ?, sku = ?, descricao = ?, preco_unitario = ? WHERE id_produto = ?', [nome_produto, sku, descricao, preco_unitario, id]);

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Rota para "deletar" (desativar) um produto
exports.deleteProduto = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await db.query('UPDATE produtos SET ativo = FALSE WHERE id_produto = ?', [id]);

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        res.status(200).json({ message: 'Produto desativado com sucesso!' });
    } catch (error) {
        console.error('Erro ao desativar produto:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};