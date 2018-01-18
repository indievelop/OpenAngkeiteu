import React from 'react';
//route
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';
//components
import { Header, Footer, Sidemenu, Search, Modals } from 'components';
import { Home, Login, Register, WriteAngkeiteu } from 'components/pages'
//containers
import { ReadAngkeiteu, SearchAngkeiteu, ShowWritingAngkeiteu, ShowParticipationAngkeiteu } from 'containers';

class App extends React.Component {
  render(){
    const {searchStatus} = this.props
    return (
      <Router>
        <div id='app'>
          <header>
            <Header/>
          </header>
          <main>
            {searchStatus.view.isOpen ? <Route component = {Search}/> : undefined}
            <Sidemenu/>
            <Route exact path = '/' component = {Home}/>
            <Route path = '/login' component = {Login}/>
            <Route path = '/register' component = {Register}/>
            <Route path = '/writeAngkeiteu' component = {WriteAngkeiteu}/>
            <Route path = '/readAngkeiteu/:id' component = {ReadAngkeiteu}/>
            <Route path = '/searchAngkeiteu/:keyword' component = {SearchAngkeiteu}/>
            <Route path = '/showWritingAngkeiteu/:accountId' component = {ShowWritingAngkeiteu}/>
            <Route path = '/showParticipationAngkeiteu/:accountId' component = {ShowParticipationAngkeiteu}/>
            <Route component = {Modals}/>
          </main>
          <footer className='page-footer'>
            <Footer/>
          </footer>
        </div>
      </Router>
    )
  }
}

export default App
