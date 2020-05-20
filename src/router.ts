import { Router } from 'express';

import { addNote, deleteNote, getNote, getNotes, updateNote } from '../middlewares/notes';

export const router = Router()
    .get('/notes', getNotes)
    .get('/note/:id', getNote)
    .put('/notes/:note', addNote)
    .post('/notes/:id&:note', updateNote)
    .delete('/notes/:id', deleteNote);
