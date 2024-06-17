import { z } from 'zod';

const branchSchema = z.object({
  name: z.string().nonempty(),
  address: z.string().nonempty(),
  phone: z.string().nonempty(),
});

export default branchSchema;
