// src/validations/userValidation.js
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(['super-admin', 'admin', 'sub-admin', 'manager', 'adminManager']),
  hotelBrand: z.string().optional(), // Required for admin, adminManager, and sub-admin
  branch: z.string().optional(), // Required for sub-admin
  permissions: z.array(z.string()).optional(), // Required for manager and adminManager
});

export default userSchema;
