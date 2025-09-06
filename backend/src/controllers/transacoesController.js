const db = require('../database/connection');

exports.registrarTransacao = async (req, res) => {
    const { id_produto, quantidade, tipo_transacao } = req.body;


    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {

        const sqlTransacao = 'INSERT INTO transacoes_estoque (id_produto, quantidade, tipo_transacao) VALUES (?, ?, ?)';
        await connection.query(sqlTransacao, [id_produto, quantidade, tipo_transacao]);

        let sqlAtualizacao;
        if (tipo_transacao === 'saida') {
            sqlAtualizacao = 'UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - ? WHERE id_produto = ?';
        } else if (tipo_transacao === 'entrada') {
            sqlAtualizacao = 'UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque + ? WHERE id_produto = ?';
        }

        await connection.query(sqlAtualizacao, [quantidade, id_produto]);

        await connection.commit();
        res.status(200).json({ message: 'Transação registrada e estoque atualizado com sucesso.' });
    } catch (error) {
        await connection.rollback();
        console.error('Erro ao registrar transação:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    } finally {
        connection.release();
    }
};

exports.getTransacoes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM transacoes_estoque ORDER BY data_transacao DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao obter transações:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};