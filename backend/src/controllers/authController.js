const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const db= require ('../database/connection')

exports.register = async(req, res) => {
    const{nome, email, senha} =req.body;
    try{
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const sql ='INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        await db.query(sql, [nome, email, senhaCriptografada]);

        res.status(201).json({ message: 'Usuario registrado com sucesso!' });
    } 
    catch(error){
        console.error('Erro ao registrar usuário:', error)
        res.status(500).json({ error: 'Erro interno no servidor' })
    }
}

exports.login = async (req, res) => {
    const {email, senha } = req.body;

        try{
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const usuario = rows[0];

        if(!usuario){
            return res.status(404).json({error: 'Usuario não encontrado.'});
        }
    
    const senhaCorreta =  await bcrypt.compare(senha, usuario.senha);
    if(!senhaCorreta){
        return res.status(401).json({error: 'Senha incorreta.'});
    }


    const token = jwt.sign({id: usuario.id_usuario, email: usuario.email}, 'SEGREDO_SUPER_SEGURO', {expiresIn: '1h'});
    res.status(200).json({message: 'Login bem-sucedido!', token})
    
    
    } catch(error){
        console.error('Erro no login:', error);
        res.status(500).json({error:'Erro interno no sevidor.'})
    }
}

