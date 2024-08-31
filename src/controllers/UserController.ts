import { Request, Response } from 'express';
import { prisma } from '../database';

export default {
    async createUser(request: Request, response: Response) {
        try {
            const { name, email } = request.body;
            const userExists = await prisma.user.findUnique({ where: { email: email } });

            if (userExists) {
                return response.status(400).json({ success: false, message: 'User already exists' });
            }

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                }
            });

            return response.status(200).json({ success: true, message: 'User created successfully', user });
        } catch (error) {
            return response.json({ message: error.message });
        }
    }
};