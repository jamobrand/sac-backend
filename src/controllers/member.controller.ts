import { NextFunction, Request, Response } from 'express';
import {
  createMember,
  findMemberByNationalId,
  findMemberById,
} from '../services/member.service';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';
import { Member } from '../entities/member.entity';
import { CreateMemberInput } from '../schemas/member.schema';

// ? Cookie Options Here

export const registerMemberHandler = async (
  req: Request<{}, {}, CreateMemberInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, phoneNumber, nationalId } = req.body;

    const member = await createMember({
      firstName, lastName, phoneNumber, nationalId
    });

    res.status(201).json({
      status: 'success',
      data: {
        member,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Member with that National ID already exist',
      });
    }
    next(err);
  }
};
