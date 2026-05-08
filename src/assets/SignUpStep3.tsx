import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/templete.css';
import './css/signupstep2.css'; 

import Header from './components/Header';

const SignUpStep3 = () => {
  const navigate = useNavigate();

  return (<>
    <Header title="회원가입" useNotification={false} />
    <div className="mobile-wrapper">  
      <div className="signup-container">
        <div className="signup-header">
            <h2 className="signup-title">SIGN UP</h2>
            <div className="step-indicator">
              <span className="step"></span>
              <span className="step"></span>
              <span className="step active">3</span>
            </div>
          </div>
          <hr className="title-line" />
        <h2>Sign Up - Step 3</h2>
        <p>This is the third step of the sign-up process.</p>
      </div>
    </div>
  </>
    
  );
};

export default SignUpStep3;