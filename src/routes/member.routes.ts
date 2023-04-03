import express from 'express';
import { validate } from '../middleware/validate';
import { createMemberSchema, createUssdSchema } from '../schemas/member.schema';
import { registerMemberHandler } from '../controllers/member.controller';
import { checkUssd } from '../controllers/ussd.controller';

const router = express.Router();

router.post("/register", validate(createMemberSchema), registerMemberHandler)

router.post("/phone/ussd", checkUssd)

export default router;

