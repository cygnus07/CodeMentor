// codementor/server/src/types/express.d.ts
import { TokenPayload } from '@/utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}