// src/server.js
import index from '../index.js';

const PORT = process.env.PORT || 5000;

index.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
