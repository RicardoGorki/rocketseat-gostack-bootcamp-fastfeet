import Bee from 'bee-queue';
import DeliveryMail from '../app/jobs/DeliveryMail';
import DeliveryDeletedMail from '../app/jobs/DeliveryDeletedMail';
import DeliveryProblemMail from '../app/jobs/DeliveryProblemMail';
import HelpOrderMail from '../app/jobs/HelpOrderMail';

import redisConfig from '../config/redis';

const jobs = [
  DeliveryMail,
  DeliveryDeletedMail,
  HelpOrderMail,
  DeliveryProblemMail,
];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
