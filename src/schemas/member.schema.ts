import { object, string, TypeOf, z } from 'zod';

export const createMemberSchema = object({
  body: object({
    firstName: string({
      required_error: 'First Name is required',
    }),
    lastName: string({
      required_error: 'Last Name is required',
    }),
    phoneNumber: string({
      required_error: 'Phone Number is required',
    }),
    nationalId: string({
      required_error: 'National ID is required',
    })
  })
})

export const createUssdSchema = z.object({
    sessionId: z.string(),
    serviceCode: z.string(),
    phoneNumber: z.string(),
    text: z.string(),
})

export type CreateMemberInput = TypeOf<typeof createMemberSchema>['body'];

export type CreateUssdInput = TypeOf<typeof createUssdSchema>;