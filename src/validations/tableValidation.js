import { z } from 'zod';

const tableSchema = z.object({
  number: z.string(),
  capacity: z.number().int().positive('Capacity must be a positive integer'),
});

export default tableSchema;
