import React from 'react';
import UserListContainer from './components/users-list-container';
import Header from './components/header';
import UserFilter from './components/user-filter';
import Footer from './components/footer';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.hr} />
      <UserFilter />
      <UserListContainer />
      <div className={styles.hr} />
      <Footer />
    </div>
  );
}

export default App;