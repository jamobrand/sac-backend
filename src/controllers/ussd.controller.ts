import { Request, Response } from "express";
import UssdMenu from "ussd-builder"
import { CreateUssdInput } from "../schemas/member.schema";


let menu = new UssdMenu()

menu.startState({
  run: () => {
    // use menu.con() to send response without terminating session
    menu.con(
      "Welcome! Ready to register for the Zizi Conference:" +
      "\n1. Get started" +
      "\n2. Get out!"
    )
  },
  // next object links to next state based on user input
  next: {
    1: "register",
    2: "quit",
  },
})

export const checkUssd = (req: Request<{}, {}, CreateUssdInput>, res: Response) => {
  
  menu.run(req.body, (ussdResult:string) => {
    res.send(ussdResult)
  })
  
  // const {
  //   sessionId,
  //   serviceCode,
  //   phoneNumber,
  //   text,
  // } = req.body
  // var response = '';

  // if (text == '') {
  //   // This is the first request. Note how we start the response with CON
  //   response = `CON What would you like to check
  //       1. My account
  //       2. My phone number`;
  // } else if (text == '1') {
  //   // Business logic for first level response
  //   response = `CON Choose account information you want to view
  //       1. Account number`;
  // } else if (text == '2') {
  //   // Business logic for first level response
  //   // This is a terminal request. Note how we start the response with END
  //   response = `END Your phone number is ${phoneNumber}`;
  // } else if (text == '1*1') {
  //   // This is a second level response where the user selected 1 in the first instance
  //   const accountNumber = 'ACC100101';
  //   // This is a terminal request. Note how we start the response with END
  //   response = `END Your account number is ${accountNumber}`;
  // }
  // res.set('Content-Type: text/plain');
  // res.send(response);
 
}