import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../lib/trpc';

export const usersRouter = router({
  getUsers: publicProcedure
    .query(async ({ input, ctx }) => {
      const users = await ctx.db.user.findMany();
      console.log(users);
      return JSON.stringify(users);
    }
  ),

  getMe: protectedProcedure
    .query(async ({ input, ctx }) => {
      const me = ctx.user;
      return me.fullName;
    }
  ),
    
  createUser: publicProcedure
    .input(
        z.object({
            name: z.string().min(1, 'Name is required'),
            age: z.number().int().positive('Age must be a positive integer'),
            email: z.string().email('Invalid email address'),
        })
    )
    .mutation(async ({ input }) => {
        const { name, age, email } = input;
        return `User created: ${name}, ${age}, ${email}`;
    }
  ),
});