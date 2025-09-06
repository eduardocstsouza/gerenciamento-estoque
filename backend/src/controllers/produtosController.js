const db = require('../database/connection');

exports.getProdutos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM produtos');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

exports.addProduto = async (req, res) => {
    const { nome_produto, sku, descricao, quantidade_em_estoque, preco_unitario } = req.body;
    try {
        const sql = 'INSERT INTO produtos (nome_produto, sku, descricao, quantidade_em_estoque, preco_unitario) VALUES (?, ?, ?, ?, ?)';
        await db.query(sql, [nome_produto, sku, descricao, quantidade_em_estoque, preco_unitario]);
        res.status(201).json({ message: 'Produto adicionado com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};


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

// Rota para deletar um produto
exports.deleteProduto = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await db.query('DELETE FROM produtos WHERE id_produto = ?', [id]);

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};