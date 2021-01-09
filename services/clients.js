const clients = require("../models/clients");

const clientsService = {
  // getAll: async (req, res) => {
  //   const { page, noLimit } = req.body;
  //   try {
  //     if (noLimit === true) {
  //       const count = await clients.countDocuments("clients");
  //       const countPage = page - 1;
  //       const limit = 10;
  //       const skip = limit * countPage - 1 + 1;

  //       const items = await clients
  //         .find()
  //         .skip(skip)
  //         .limit(limit);
  //       res.json({ items, total: count }).status(200);
  //     } else {
  //       const items = await clients.find();

  //       res.json({ items }).status(200);
  //     }
  //   } catch (error) {
  //     res.json(error).status(500);
  //   }
  // },
  filter: async (req, res) => {
    const { from } = req.body;
    try {
    if (from) {
        console.log(req.body)
        const existsClient = await clients.findOne({ from: from });
        console.log('se nao existir', existsClient)

        res.json(existsClient).status(200);
      } 
    } catch (error) {
      res.json(error).status(500);
    }
  },
  create: async (req, res) => {
    const payload = req.body;
    try {
      if (
        !payload.name ||
        !payload.cpf ||
        !payload.from ||
        !payload.age
      )
        throw { msg: "Dados inválidos", status: 400 };
        const existsClient = await clients.findOne({ from: payload.from, cpf:payload.cpf });
        if (existsClient) 
        throw { msg: `Contato ${existsClient.from} já existente no sistema`, status: 400 };

      const data = await clients.create(payload);
      console.log('createSuccess', data)
      res.json(data).status(201);
    } catch (error) {
      if (error.status) res.status(error.status).json(error.msg);
      else res.json(error).status(500);
    }
  },
  // delete: async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     const clientExists = await clients.find({ _id: id });
  //     if (!clientExists.length)
  //       throw {
  //         msg: "Cliente não existe",
  //         status: 400,
  //       };

  //     if (!id) throw { msg: "Id não informado", status: 400 };
  //     const data = await clients.remove({ _id: id });
  //     res.json(data).status(204);
  //   } catch (error) {
  //     if (error.status) res.status(error.status).json(error.msg);
  //     else res.json(error).status(500);
  //   }
  // },
  // update: async (req, res) => {
  //   const payload = req.body;
  //   const { id } = req.params;
  //   try {
  //     if (!id) throw { msg: "Id inválidos", status: 400 };

  //     const existsClient = await clients.findOne({ _id: id });

  //     if (!existsClient) throw { msg: "Cliente não existe", status: 400 };

  //     const data = await clients.updateOne({ _id: id }, payload, {
  //       multi: false,
  //     });
  //     res.json(data).status(204);
  //   } catch (error) {
  //     if (error.status) res.status(error.status).json(error.msg);
  //     else res.json(error).status(500);
  //   }
  // },
};

module.exports = clientsService;
