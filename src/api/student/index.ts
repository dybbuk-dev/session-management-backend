export default app => {
  app.post(`/students`, require('./studentCreate').default);
  app.put(`/students/:id`, require('./studentUpdate').default);
  app.delete(`/students`, require('./studentDestroy').default);
  app.get(`/students`, require('./studentList').default);
};
