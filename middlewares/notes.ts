import * as express from 'express';
import * as STATUS_CODES from 'http-status-codes';

import { databaseInstance } from '../src';

const COLLECTIONS = {
  NOTES: 'notes',
};

export const getNotes = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
  const notesRef = databaseInstance.collection(COLLECTIONS.NOTES);
  await notesRef.get()
    .then(snapshot => {
      let snaps = {};
      snapshot.forEach(doc => {
        snaps = {
          ...snaps,
          [doc.id]: {
            id: doc.id,
            ...doc.data(),
          },
        };
      });
      res.status(STATUS_CODES.OK);
      res.type('text/json');
      res.send(snaps);
    })
    .catch(err => {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
      res.send(err);
      next(err);
    });
};

export const getNote = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  const noteRef = databaseInstance.collection(COLLECTIONS.NOTES).doc(id);
  let body = {}; 
  noteRef.get()
  .then(doc => {
      if (!doc.exists) {
        res.status(STATUS_CODES.BAD_REQUEST);
        res.type('text/json');
        res.send(`No such id ${id}`);
      } else {
        body = {
          id,
          ...doc.data(),
        };
        res.status(STATUS_CODES.OK);
        res.type('text/json');
        res.send(body);
      }
  })
  .catch(err => {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
      res.send(err);
      next(err);
  });
};

export const addNote = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { note } = req.params;
  let body = {};
  databaseInstance.collection(COLLECTIONS.NOTES).add({
    note, 
  }).then(ref => {
    const { id } = ref;
    body = {
      id,
      note,
    };
    res.status(STATUS_CODES.OK);
    res.type('text/json');
    res.send(body);
  }).catch((err) => {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
    res.send(err);
    next(err);
  });
};

export const updateNote = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id, note } = req.params;
  const body = { id, note};
  databaseInstance.collection(COLLECTIONS.NOTES).doc(id).update({
    note, 
  }).then(() => {
    res.status(STATUS_CODES.OK);
    res.type('text/json');
    res.send(body);
  }).catch((err) => {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
    res.send(err);
    next(err);
  });
};

export const deleteNote = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id } = req.params;
  databaseInstance.collection(COLLECTIONS.NOTES).doc(id).delete()
    .then(() => {
      res.status(STATUS_CODES.ACCEPTED);
      res.type('text/json');
      res.send(id);
    }).catch((err) => {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
      res.send(err);
      next(err);
    });
};
