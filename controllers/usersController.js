// Importando o modelo de usuários
const Users = require('../models/users');
// Criando uma instância do modelo de usuários
const usersInstance = new Users();

// Função para criar um novo usuário
const createUser = (req, res) => {
    // Extraindo os dados do corpo da requisição
    const { name, sobrenome, idade, email, cpf, telefone } = req.body;

    // Verificando se todos os campos obrigatórios estão presentes
    if (!name || !sobrenome || !idade || !email || !cpf || !telefone) {
        return res.status(400).json({ error: 'Missing required user data' });
    }

    try {
        // Adicionando os dados do usuário à instância do modelo de usuários
        const userNew = usersInstance.addUsersData(name, sobrenome, idade, email, cpf, telefone);
        // Respondendo com o novo usuário criado
        res.status(201).json(userNew);
        console.log('Usuário criado com sucesso:', userNew);
    } catch (error) {
        // Lidando com erros durante a criação do usuário
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Função para obter todos os usuários
const getAllUsers = (req, res) => {
    // Obtendo todos os usuários da instância do modelo de usuários
    const allUsers = usersInstance.getAllUsers();
    // Respondendo com a lista de todos os usuários
    res.status(200).json(allUsers);
    console.log('Lista de todos os usuários:', allUsers);
};

// Função para obter um usuário por CPF
const getUserByCpf = (req, res) => {
    // Obtendo o CPF do parâmetro da requisição
    const userCpf = req.params.cpf;
    // Buscando o usuário pelo CPF na instância do modelo de usuários
    const user = usersInstance.getUserByCpf(userCpf);

    // Verificando se o usuário foi encontrado
    if (user) {
        // Respondendo com o usuário encontrado
        res.status(200).json(user);
        console.log('Usuário encontrado:', user);
    } else {
        // Respondendo com erro caso o usuário não seja encontrado
        res.status(404).send('User not found');
        console.log('Usuário não encontrado');
    }
};

// Função para atualizar um usuário
const updateUser = (req, res) => {
    // Obtendo o CPF do usuário a ser atualizado
    const userCpf = req.params.cpf;
    // Extraindo os novos dados do corpo da requisição
    const { name, sobrenome, idade, email, telefone } = req.body;

    // Verificando se todos os campos obrigatórios estão presentes
    if (!name || !sobrenome || !idade || !email || !telefone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        // Atualizando os dados do usuário na instância do modelo de usuários
        usersInstance.updateUserData(userCpf, name, sobrenome, idade, email, telefone);
        // Respondendo com sucesso após a atualização
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        console.log('Usuário atualizado com sucesso');
    } catch (error) {
        // Lidando com erros durante a atualização do usuário
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Função para deletar um usuário
const deleteUser = (req, res) => {
    // Obtendo o CPF do usuário a ser deletado
    const userCpf = req.params.cpf;

    try {
        // Deletando o usuário da instância do modelo de usuários
        usersInstance.deleteUserData(userCpf);
        // Respondendo com sucesso após a deleção
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
        console.log('Usuário deletado com sucesso');
    } catch (error) {
        // Lidando com erros durante a deleção do usuário
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Exportando as funções e a instância do modelo de usuários
module.exports = {
    createUser,
    getAllUsers,
    getUserByCpf,
    updateUser,
    deleteUser,
    usersInstance
};
