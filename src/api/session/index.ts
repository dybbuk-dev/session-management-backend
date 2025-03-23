export default app => {
  app.post(`/sessions`, require('./sessionCreate').default);
  app.put(`/sessions/:id`, require('./sessionUpdate').default);
  app.delete(`/sessions`, require('./sessionDestroy').default);
  app.get(`/sessions`, require('./sessionList').default);
};
