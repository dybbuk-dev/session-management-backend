export default app => {
  app.post(`/assignments`, require('./assignmentCreate').default);
  app.delete(`/assignments`, require('./assignmentDestroy').default);
  app.get(`/assignments`, require('./assignmentList').default);
};
