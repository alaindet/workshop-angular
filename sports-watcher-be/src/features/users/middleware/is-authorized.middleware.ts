import { Request, Response, NextFunction } from 'express';

export function isAuthorized(...roles: string[]) {

  const err = (res: Response) => res.status(403).send({
    message: 'You are not authorized',
  });

  return function(req: Request, res: Response, next: NextFunction) {

    // TODO: Type!!!
    const user = (req as any).user;

    if (!user) {
      return err(res);
    }

    if (!user.role) {
      return err(res);
    }

    if (!roles.includes(user.role)) {
      return err(res);
    }

    next();
  }
}
