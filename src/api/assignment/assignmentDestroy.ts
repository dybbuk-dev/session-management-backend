import ApiResponseHandler from '../apiResponseHandler';
import AccessoryService from '../../services/assignmentService';

export default async (req, res, next) => {
  try {
    await new AccessoryService(req).destroy(req.query.id);

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
