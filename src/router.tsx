import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const MainPage = lazy(() => import('./pages/MainPageDataController'));
const MappingDetailDataController = lazy(() =>
  import('./pages/MappingDetailDataController'),
);
const MarkdownEditorDataController = lazy(() =>
  import('./pages/MarkdownEditorDataController'),
);

export default () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/mapping/:id" component={MappingDetailDataController} />
        <Route
          path="/markdown/edit/:id"
          component={MarkdownEditorDataController}
        />
        <Route path="/markdown/:id" component={MarkdownEditorDataController} />
      </Switch>
    </Suspense>
  </Router>
);
