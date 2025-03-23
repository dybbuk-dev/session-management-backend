import ApiResponseHandler from '../apiResponseHandler';
import SessionService from '../../services/sessionService';

export default async (req, res, next) => {
  try {
    const payload = await new SessionService(req).list();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
