import React from 'react';
import '../Styles/Quiz.css';
import furret from '../assets/furret-walk.gif';

function FurretLoadingScreen() {
  return (
    <div className="furret"><img style={{ height: '30vh' }} src={furret} alt="a furret walking" /></div>
  );
}

export default FurretLoadingScreen;
