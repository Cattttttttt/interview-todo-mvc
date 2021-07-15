import mongoose from 'mongoose';

const Types = mongoose.SchemaTypes;

export const TodoSchema = new mongoose.Schema({
  hashId: {
    type: Types.String,
    required: true,
    unique: true,
  },
  content: {
    type: Types.String,
    required: true,
  },
  status: {
    type: Types.String,
    required: true,
  },
  user: {
    type: Types.String,
    required: true,
  },
});

export const TodoModel = mongoose.model('todo', TodoSchema);