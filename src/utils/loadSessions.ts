import fs from 'fs';
import path from 'path';
import Session from '../database/models/session';
import { databaseInit } from '../database/databaseConnection';

export default async function loadSessionsFromFile() {
  try {
    const database = await databaseInit();
    const filePath = path.join(__dirname, '../../sessions.json');

    if (!filePath) {
      return;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const sessions = data.sessions;

    for (const courseName in sessions) {
      const courseSessions = sessions[courseName];
      for (const s of courseSessions) {
        const exists = await Session(database).findOne({
          name: courseName,
          startAt: new Date(s.start_date),
        });
        if (!exists) {
          await Session(database).create({
            name: courseName,
            startAt: new Date(s.start_date),
            endAt: new Date(s.end_date),
            quota: s.quota,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error loading sessions from file:', error);
  }
}
