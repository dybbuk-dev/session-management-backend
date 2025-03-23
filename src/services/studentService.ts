import { IServiceOptions } from './IServiceOptions';
import Error404 from '../errors/Error404';
import Student from '../database/models/student';

export default class StudentService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    try {
      const [record] = await Student(this.options.database).create([data]);

      return record;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    let record = await Student(this.options.database).findOne({
      _id: id,
    });

    if (!record) {
      throw new Error404();
    }

    record = await Student(this.options.database).updateOne({ _id: id }, data);

    return record;
  }

  async destroy(id) {
    let record = Student(this.options.database).findOne({
      _id: id,
    });

    if (!record) {
      throw new Error404();
    }

    await Student(this.options.database).deleteOne({ _id: id });
  }

  async list() {
    try {
      const records = await Student(this.options.database).find();

      return records;
    } catch (error) {
      throw error;
    }
  }
}
