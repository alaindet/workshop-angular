import { Request, Response, NextFunction } from 'express';

export function fakeLatency(min: number, max: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    setTimeout(next, Math.floor((Math.random() * (max - min)) + min));
  };
}
