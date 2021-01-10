const clients = require("../models/clients");
const preRegistration = require("../models/preRegistration");

const clientsService = {
  filter: async (req, res) => {
    const { from } = req.body;
    console.log(req.body);
    try {
    if (from) {
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
  verifyStepper: async (req,res) => {
    const { from } = req.params;
    if(!from){
      res.status(404).json('Whatsapp não informado');
      return;
    } 
    const existsPreRegistration = await preRegistration.findOne({from: from});
    if(!existsPreRegistration) {
      const newPreRegistration = await preRegistration.create({from, stepper: 0});
      res.status(200).json(newPreRegistration.stepper);
      return;
    }
    res.status(200).json(existsPreRegistration.stepper);
    return;
  },
  resetStepper: async (req,res) => {
    const {from} = req.params;
    if(!from){
      res.status(404).json('Whatsapp não informado');
      return;
    } 
    const existsPreRegistration = await preRegistration.findOne({from: from});
    if(!existsPreRegistration) {
      const newPreRegistration = await preRegistration.create({from, stepper: 0});
      res.status(200).json(newPreRegistration.stepper);

      return;
    }
    const updatedPreRegistration = await preRegistration.updateOne({from: from},{ from, stepper: 0});
    res.status(200).json(updatedPreRegistration.stepper);
    return;
  },
  updateStepper: async (req,res) => {
    const {from} = req.params;
    if(!from){
      res.status(404).json('Whatsapp não informado');
      return;
    } 
    const existsPreRegistration = await preRegistration.findOne({from: from});
    if(!existsPreRegistration) {
      const newPreRegistration = await preRegistration.create({from, stepper: 0});
      res.status(200).json(newPreRegistration.stepper);
      return
    }
    const incrementStepper = parseInt(existsPreRegistration.stepper, 10) + 1
    await preRegistration.updateOne({from: from},{ from, stepper: incrementStepper});
    const updatedPreRegistration = await preRegistration.findOne({from: from});
    res.json(updatedPreRegistration.stepper).status(200);
    return;
  },
  deletePreRegistration: async (req,res) => {
    const {from} = req.params;
    if(!from){
      res.status(404).json('Whatsapp não informado');
      return;
    } 
    const existsPreRegistration = await preRegistration.findOne({from: from});
    if(!existsPreRegistration) {
      res.status(200);
      return;
    }
    const deletePreRegistration = await preRegistration.deleteOne({from: from});
    res.status(200).json(deletePreRegistration);
    return;
  }
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
