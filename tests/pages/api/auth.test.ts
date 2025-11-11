/**
 * @jest-environment node
 */
import type { Adapter } from 'next-auth/adapters';

jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn(() => 'handler'),
}));

const adapterMock = jest.fn(() => ({ name: 'adapter' } as unknown as Adapter));

jest.mock('@next-auth/mongodb-adapter', () => ({
  MongoDBAdapter: (...args: unknown[]) => adapterMock(...args),
}));

const googleProviderMock = jest.fn((config) => ({ id: 'google', ...config }));
jest.mock('next-auth/providers/google', () => ({
  __esModule: true,
  default: (config: any) => googleProviderMock(config),
}));

jest.mock('../../../src/lib/mongodbClient', () => ({
  __esModule: true,
  default: 'clientPromiseMock',
}));

describe('authOptions configuration', () => {
  let authOptions: any;
  let NextAuth: jest.Mock;
  beforeEach(() => {
    jest.resetModules();
    process.env.MONGO_URI = 'mongodb://localhost:27017/test';
    process.env.GOOGLE_CLIENT_ID = 'mock-google-client';
    process.env.GOOGLE_CLIENT_SECRET = 'mock-google-secret';
    process.env.NEXTAUTH_SECRET = 'mock-secret';
    NextAuth = require('next-auth').default;
    ({ authOptions } = require('../../../src/pages/api/auth/[...nextauth]'));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    delete process.env.MONGO_URI;
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;
    delete process.env.NEXTAUTH_SECRET;
  });

  test('NextAuth is called with the exported authOptions', () => {
    expect(NextAuth).toHaveBeenCalledWith(authOptions);
    expect(adapterMock).toHaveBeenCalledWith('clientPromiseMock');
    expect(authOptions.adapter).toEqual({ name: 'adapter' });
  });

  test('Google provider is configured with credentials', () => {
    expect(googleProviderMock).toHaveBeenCalledWith({
      clientId: 'mock-google-client',
      clientSecret: 'mock-google-secret',
    });
    expect(authOptions.providers[0].id).toBe('google');
  });

  test('callbacks attach user id to session and token', async () => {
    const session = { user: {} };
    const returnedSession = await authOptions.callbacks.session({
      session,
      token: { sub: 'u1' },
    });
    expect(returnedSession.user.id).toBe('u1');

    const token = await authOptions.callbacks.jwt({
      token: {},
      user: { id: 'user-123' },
    });
    expect(token.sub).toBe('user-123');
  });
});
