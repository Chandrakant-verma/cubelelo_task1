import { Ticket } from "../model/tickets_model.js";

const createTicket = async(req,res)=>{
    
     const { customername,productname, issue, category, status, priority  } = req.body;
     const ticket = await Ticket.create({
             customername : customername,
             productname  : productname,
             issue : issue,
             category: category,
             status: status,
             priority: priority
     })

     if( !ticket){
      console.log("failed to create ticket");
      return;
     }
     
     console.log("successfully created ticket:",ticket);
     res.end();
}

export { createTicket};