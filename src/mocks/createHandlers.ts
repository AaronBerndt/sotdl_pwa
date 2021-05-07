import { rest } from "msw";

export const createGetMock = (
  url: string,
  status: number,
  dataReturn: object
) =>
  rest.get(url, async (req, res, ctx) => {
    return res(ctx.status(status), ctx.json(dataReturn));
  });

export const createPostMock = (
  url: string,
  status: number,
  dataReturn: object
) =>
  rest.post(url, async (req, res, ctx) => {
    return res(ctx.status(status), ctx.json(dataReturn));
  });

export const createPutMock = (
  url: string,
  status: number,
  dataReturn: object
) =>
  rest.put(url, async (req, res, ctx) => {
    return res(ctx.status(status), ctx.json(dataReturn));
  });

export const createDeleteMock = (
  url: string,
  status: number,
  dataReturn: object
) =>
  rest.delete(url, async (req, res, ctx) => {
    return res(ctx.status(status), ctx.json(dataReturn));
  });
