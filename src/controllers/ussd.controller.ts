import { Request, Response } from "express";
import UssdMenu from "ussd-builder"
import { CreateUssdInput } from "../schemas/member.schema";
import { findMemberByNationalId } from "../services/member.service";


let menu = new UssdMenu()

// let dataSave = {}

menu.startState({
  run: () => {
    // use menu.con() to send response without terminating session
    menu.con(
      "Welcome to Savings and Sacco Co-Operative:" +
      '\n1. Check My Account' +
      '\n2. Quit'
    )
  },
  // next object links to next state based on user input
  next: {
    1: "checkAccount",
    2: "quit",
  },
  defaultNext: 'invalidOption'
})

menu.state('invalidOPtion', {
  run: () => {
    menu.end('Invalid option')
  }
})

menu.state('checkAccount', {
  run: () => {
    menu.con('Enter your ID Number')
  },
  next: {
    '*\\d+': 'checkAccount.id'
  }
})

menu.state('checkAccount.id', {
  run: async () => {
    const nationalId = menu.val
    const member = await findMemberByNationalId({ nationalId })
    
    if (member) {
      menu.end(`You are a member of this sacco ${member.firstName}`)
    } else {
      menu.end("Visit our nearest sacco to register in order to use this service")
    }
  },
})

menu.state('invalidOPtion', {
  run: () => {
    menu.end('Invalid option')
  }
})

menu.state('quit', {
  run: () => {
    menu.end('Thank you for using our service')
  }
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