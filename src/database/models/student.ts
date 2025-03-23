import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default database => {
  try {
    return database.model('student');
  } catch (error) {}

  const StudentSchema = new Schema(
    {
      name: {
        type: String,
        maxlength: 255,
        required: true,
      },
      email: {
        type: String,
        maxlength: 255,
        index: { unique: true },
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  StudentSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    }
  );

  StudentSchema.virtual('id').get(function () {
    return this._id.toHexString();
  });

  StudentSchema.set('toJSON', {
    getters: true,
  });

  StudentSchema.set('toObject', {
    getters: true,
  });

  return database.model('student', StudentSchema);
};
