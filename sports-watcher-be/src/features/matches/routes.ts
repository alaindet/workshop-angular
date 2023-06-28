import { Router } from 'express';

import { getMatches, createMatch, deleteMatch } from './handlers';

const router = Router();

router.get('/', getMatches);
router.post('/', createMatch);
router.delete('/:id', deleteMatch);
// ...

export default router;
