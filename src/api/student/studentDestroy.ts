import ApiResponseHandler from '../apiResponseHandler';
import StudentService from '../../services/studentService';

export default async (req, res, next) => {
  try {
    await new StudentService(req).destroy(req.query.id);

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
