import Error400 from '../errors/Error400';
import { IServiceOptions } from './IServiceOptions';
import Assignment from '../database/models/assignment';
import Error404 from '../errors/Error404';

export default class AssignmentService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    try {
      const { student, session } = data;
      const conflict = await Assignment(this.options.database).findOne({
        student,
        session,
      });

      if (conflict) {
        throw new Error400('Already assigned');
      }

      const record = await Assignment(this.options.database).create(data);

      return record;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    let record = Assignment(this.options.database).findOne({
      _id: id,
    });

    if (!record) {
      throw new Error404();
    }

    await Assignment(this.options.database).deleteOne({ _id: id });
  }

  async list() {
    try {
      const records = await Assignment(this.options.database)
        .find()
        .populate('student')
        .populate('session');

      return records;
    } catch (error) {
      throw error;
    }
  }
}
