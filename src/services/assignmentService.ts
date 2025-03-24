import Error400 from '../errors/Error400';
import { IServiceOptions } from './IServiceOptions';
import Assignment from '../database/models/assignment';
import Session from '../database/models/session';
import Error404 from '../errors/Error404';

export default class AssignmentService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    try {
      const { student, session } = data;

      const sessionRecord = await Session(this.options.database).findById(
        session
      );

      if (!sessionRecord) {
        throw new Error404('Session not found');
      }

      const assignedCount = await Assignment(
        this.options.database
      ).countDocuments({ session });

      if (assignedCount >= sessionRecord.quota) {
        throw new Error400('Session is full');
      }

      const studentAssignments = await Assignment(this.options.database)
        .find({ student })
        .populate('session');

      const hasConflict = studentAssignments.some((a: any) => {
        const s = a.session;
        return (
          new Date(sessionRecord.startAt) < new Date(s.endAt) &&
          new Date(sessionRecord.endAt) > new Date(s.startAt)
        );
      });

      if (hasConflict) {
        throw new Error400('Overlapping session already assigned');
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
