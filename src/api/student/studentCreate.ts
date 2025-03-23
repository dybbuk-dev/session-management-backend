import ApiResponseHandler from '../apiResponseHandler';
import StudentService from '../../services/studentService';

export default async (req, res, next) => {
  try {
    const payload = await new StudentService(req).create(req.body);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
