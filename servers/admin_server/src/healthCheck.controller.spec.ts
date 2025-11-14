import { Test, type TestingModule } from '@nestjs/testing';
import { ApplicationModule } from './application/application.module';
import { HealthCheckController } from './healthCheck.controller';

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      imports: [ApplicationModule],
      providers: [],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('healthCheck', () => {
    it('should return "{ success: true }"', () => {
      expect(healthCheckController.healthCheck()).toEqual({ success: true });
    });
  });
});
