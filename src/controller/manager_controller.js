import { Ticket } from "../model/tickets_model.js";

const getList = async(req, res)=> {
    
     const list = await Ticket.find();
     
     res.render("getList",{list: list});
}

const seeUresolved = async(req, res) => {

     const list = await Ticket.find({status : "open"});

     res.render("seeunresolved",{list: list});
}

const pattern = async(req, res) => {

     const list = await Ticket.find();

     res.render("pattern",{list: list});
}

const summary = async(req, res) => {

     const list = await Ticket.find();

     res.render("summary",{list : list});
}

export {getList, seeUresolved, pattern, summary};