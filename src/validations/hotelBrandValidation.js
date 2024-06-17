import { z } from 'zod';

const hotelBrandSchema = z.object({
  name: z.string().nonempty(),
  address: z.string().nonempty(),
  phone: z.string().nonempty(),
  adminName: z.string().nonempty(),
  adminEmail: z.string().email(),
  adminPassword: z.string().min(6),
});

export default hotelBrandSchema;
