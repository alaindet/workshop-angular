import { Router } from 'express';

import { isAuthenticated, isAuthorized } from '../users';
import { getTeams, createTeam, deleteTeam } from './handlers';

const router = Router();

router.get('/', isAuthenticated, isAuthorized('basic', 'admin'), getTeams);
router.post('/', isAuthenticated, isAuthorized('admin') , createTeam);
router.delete('/:id', isAuthenticated, isAuthorized('admin'), deleteTeam);
// ...

export default router;
