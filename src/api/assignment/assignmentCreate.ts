import ApiResponseHandler from '../apiResponseHandler';
import AccessoryService from '../../services/assignmentService';

export default async (req, res, next) => {
  try {
    const payload = await new AccessoryService(req).create(req.body);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
