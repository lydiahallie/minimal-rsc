import {Suspense} from 'react';

import Nav from './Nav';
import Page from './Page';

export default function App({page}) {
  return (
    <div className="main">
      <Nav />
      <section key={page} className="col note-viewer">
        <Suspense fallback={<p>Loading...</p>}>
          <Page page={page} />
        </Suspense>
      </section>
    </div>
  );
}
