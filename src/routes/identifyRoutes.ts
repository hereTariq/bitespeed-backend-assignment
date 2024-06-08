import { Router } from 'express';
import validate from '../middlewares/validate';
import { identityContactValidation } from '../utils/validations/identifyContactValidation';
import { identifyContact } from '../controllers/identifyController';
const router = Router();

router
    .route('/identify')
    .post(validate(identityContactValidation), identifyContact);

export default router;
