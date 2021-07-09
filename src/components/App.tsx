import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { init } from '../redux/app-reducer';
import '../styles/styles.css';
import Header from './header/Header';
import Lesson from './lesson/Lesson';
import Homework from './homework/Homework';
import Vocabulary from './vocabulary/Vocabulary';


type TProps = {
   init: () => void
};

const App: React.FC<TProps> = ({init}) => {
   useEffect(() => { init(); }, [init]);

   return <>
      <Header />
      <Switch>
         <Route path='/lessons/:lessonNumber' component={Lesson} />
         <Route path='/homework' component={Homework} />
         <Route path='/vocabulary' component={Vocabulary} />

         <Route path='/404-not-found'>
            <main className='page-404'>
               <div className='container container_with-spinner center-container'>
                  <h1>404 not found</h1>
               </div>
            </main>
         </Route>
         <Redirect from='*' to='/404-not-found' />
      </Switch>
   </>;
};

export default connect(null, { init })(App);