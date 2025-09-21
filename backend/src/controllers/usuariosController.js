const bcrypt = require('bcrypt');
const db = require('../database/connection');

// rota para listar todos os usuários
exports.getUsuarios = async (req, res) => {
    try {
        // seleciona todos os usuários, mas omite a coluna de senha por segurança
        const [rows] = await db.query('SELECT id_usuario, nome, email, criado_em FROM usuarios');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// rota para atualizar um usuário (nome, email e opcionalmente a senha)
exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    try {
        let sql = 'UPDATE usuarios SET nome = ?, email = ? WHERE id_usuario = ?';
        let params = [nome, email, id];

        // se uma nova senha for fornecida, ela deve ser criptografada antes de salvar
        if (senha) {
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id_usuario = ?';
            params = [nome, email, senhaCriptografada, id];
        }

        const [result] = await db.query(sql, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// rota para deletar um usuário
exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};