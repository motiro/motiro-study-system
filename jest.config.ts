import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testTimeout: 15000,
  coverageDirectory: '<rootDir>/data/test/coverage',
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^@controllers(.*)$': 'applications/controllers$1',
    '^@middlewares(.*)$': 'applications/middlewares$1',
    '^@usecases(.*)$': 'applications/usecases$1',
    '^@entities(.*)$': 'domain/entities$1',
    '^@repository(.*)$': 'domain/repository$1',
    '^@jwt(.*)$': 'infrastructure/authentication/jwt$1',
    '^@mongo(.*)$': 'infrastructure/persistence/mongo$1'
  }
}

export default config
