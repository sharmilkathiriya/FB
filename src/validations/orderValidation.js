import { z } from 'zod';

const orderSchema = z.object({
  tableId: z.string().nonempty({ message: "Table ID is required" }),
  foods: z.array(z.string()).nonempty({ message: "Foods are required" }),
  status: z.enum(['pending', 'completed', 'cancelled']).optional(),
});

export default orderSchema;
