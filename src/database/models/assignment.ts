import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default database => {
  try {
    return database.model('assignment');
  } catch (error) {}

  const AssignmentSchema = new Schema(
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: true,
      },
      session: {
        type: Schema.Types.ObjectId,
        ref: 'session',
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  AssignmentSchema.virtual('id').get(function () {
    return this._id.toHexString();
  });

  AssignmentSchema.set('toJSON', {
    getters: true,
  });

  AssignmentSchema.set('toObject', {
    getters: true,
  });

  return database.model('assignment', AssignmentSchema);
};
