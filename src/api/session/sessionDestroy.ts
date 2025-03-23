import ApiResponseHandler from '../apiResponseHandler';
import SessionService from '../../services/sessionService';

export default async (req, res, next) => {
  try {
    await new SessionService(req).destroy(req.query.id);

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
