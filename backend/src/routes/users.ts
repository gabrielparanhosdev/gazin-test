import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('respond with a resource');
});

export default router;