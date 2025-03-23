import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default database => {
  try {
    return database.model('session');
  } catch (error) {}

  const SessionSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        maxlength: 255,
      },
      startAt: {
        type: Date,
        required: true,
      },
      endAt: {
        type: Date,
        required: true,
      },
      quota: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  SessionSchema.virtual('id').get(function () {
    return this._id.toHexString();
  });

  SessionSchema.set('toJSON', {
    getters: true,
  });

  SessionSchema.set('toObject', {
    getters: true,
  });

  return database.model('session', SessionSchema);
};
