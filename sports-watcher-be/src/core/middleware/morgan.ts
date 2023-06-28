import { FormatFn } from 'morgan';

export const morganFormatter: FormatFn = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `(${tokens.res(req, res, 'content-length') ?? 0} bytes)`, '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ');
};
