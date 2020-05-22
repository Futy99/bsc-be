import { Router } from 'express';

import { addNote, deleteNote, getNote, getNotes, updateNote } from '../middlewares/notes';

export const router = Router()
    .get('/notes', getNotes)
    .get('/note', getNote)
    .put('/notes', addNote)
    .post('/notes', updateNote)
    .delete('/notes', deleteNote);
