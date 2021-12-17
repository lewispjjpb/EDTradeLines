import React, {Suspense} from 'react';
import ReactDOM from 'react-dom'
const Main = React.lazy(() => import('./index.jsx'))


ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Main/>
  </Suspense>,
  document.getElementById('root')
);