const db = require('../database/connection');

// Rota para listar todos os fornecedores
exports.getFornecedores = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM fornecedores');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao obter fornecedores:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Rota para adicionar um novo fornecedor
exports.addFornecedor = async (req, res) => {
    const { nome_fornecedor, contato, cnpj } = req.body;
    try {
        const sql = 'INSERT INTO fornecedores (nome_fornecedor, contato, cnpj) VALUES (?, ?, ?)';
        await db.query(sql, [nome_fornecedor, contato, cnpj]);
        res.status(201).json({ message: 'Fornecedor adicionado com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar fornecedor:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Rota para atualizar um fornecedor
exports.updateFornecedor = async (req, res) => {
    const { id } = req.params;
    const { nome_fornecedor, contato, cnpj } = req.body;
    try {
        const sql = 'UPDATE fornecedores SET nome_fornecedor = ?, contato = ?, cnpj = ? WHERE id_fornecedor = ?';
        const [result] = await db.query(sql, [nome_fornecedor, contato, cnpj, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Fornecedor não encontrado.' });
        }
        res.status(200).json({ message: 'Fornecedor atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// Rota para deletar um fornecedor
exports.deleteFornecedor = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM fornecedores WHERE id_fornecedor = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Fornecedor não encontrado.' });
        }
        res.status(200).json({ message: 'Fornecedor deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar fornecedor:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};