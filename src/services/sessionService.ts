import { IServiceOptions } from './IServiceOptions';
import Session from '../database/models/session';
import Error404 from '../errors/Error404';

export default class SessionService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    try {
      const [record] = await Session(this.options.database).create([data]);

      return record;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    let record = await Session(this.options.database).findOne({
      _id: id,
    });

    if (!record) {
      throw new Error404();
    }

    record = await Session(this.options.database).updateOne({ _id: id }, data);

    return record;
  }

  async destroy(id) {
    let record = Session(this.options.database).findOne({
      _id: id,
    });

    if (!record) {
      throw new Error404();
    }

    await Session(this.options.database).deleteOne({ _id: id });
  }

  async list() {
    try {
      const records = await Session(this.options.database).find();

      return records;
    } catch (error) {
      throw error;
    }
  }
}
