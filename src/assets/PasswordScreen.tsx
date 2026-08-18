import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from './store/useProfile';
import type { components } from './service/api';
import './css/templete.css';

import Header from './components/Header';
import Popup from './components/Popup';

type ChangePasswordData = components['schemas']['ChangePasswordDTO'];

const PasswordScreen: React.FC = () => {
    const navigate = useNavigate();

    const { updatePassword, isUpdatingPassword } = useProfile();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [savePopup, setSavePopup] = useState(false);

    const isButtonDisabled = 
        !oldPassword || !newPassword || !confirmPassword ||
        !!oldPasswordError || !!newPasswordError || !!confirmPasswordError;

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,20}$/;

    const changeOldPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setOldPasswordError('');
        setOldPassword(e.target.value);
    }

    const changeNewPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewPassword(e.target.value);
    }

    const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setConfirmPassword(e.target.value);
    }

    const checkNewPassword = () => {
        if (newPassword && !passwordRegex.test(newPassword)) {
            setNewPasswordError('비밀번호는 영문/숫자/특수문자를 포함하여 8~20자리로 입력해주세요.');
            return false;
        } else if (newPassword && oldPassword==newPassword) {
            setNewPasswordError('기존 비밀번호와 중복입니다.');
            return false;
        } else {
            setNewPasswordError('');
            return true;
        }
    };

    const checkConfirmPassword = () => {
        if (confirmPassword && newPassword !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            setConfirmPasswordError('');
            return true;
        }
    };

    const savePassword = async() => {
        const check = checkNewPassword() && checkConfirmPassword();
        if (!check) return;

        const updateData: ChangePasswordData = {
            currentPassword: oldPassword ?? '',
            newPassword: newPassword ?? ''
        }
        const result = await updatePassword(updateData);
        if (result.isSuccess) {
            setSavePopup(true);
        } else {
            setOldPasswordError(result.message);
        }
    }

    return (
        <>
            <Header title="비밀번호 변경" useNotice={false} />

            <main className="main-content">
                <section className="main-section">
                    <form className='input-form' action="">
                        <div className='input-box column'>
                            <label className='input-label'>기존 비밀번호
                                <input className='password-input'
                                type="password"
                                value={oldPassword}
                                placeholder='변경 전 비밀번호 입력'
                                onChange={changeOldPassword}
                                />
                            </label>
                            <span className='message error'>{oldPasswordError}</span>
                        </div>
                        <div className='input-box column'>
                            <label className='input-label'>신규 비밀번호
                                <input className='password-input'
                                type="password"
                                value={newPassword}
                                placeholder='영문/숫자/특수문자 포함 8~20자리'
                                onChange={changeNewPassword}
                                onBlur={checkNewPassword}
                            />
                            </label>
                            <span className='message error'>{newPasswordError}</span>

                            <input className='password-input'
                                type="password"
                                value={confirmPassword}
                                placeholder='비밀번호 확인'
                                onChange={changeConfirmPassword}
                                onBlur={checkConfirmPassword}
                            />
                            <span className='message error'>{confirmPasswordError}</span>
                        </div>
                    </form>
                </section>

                <section className='bar-button-box'>
                    <button 
                        className='bar-button'
                        onClick={()=>savePassword()}
                        disabled={isButtonDisabled || isUpdatingPassword}
                    >{isUpdatingPassword ? '비밀번호 변경 중...' : '비밀번호 변경'}</button>
                </section>
            </main>

            <Popup
                popupMessage={
                {
                    title: '비밀번호가 변경되었습니다.',
                    type: 'OK'
                }
                }
                visible={savePopup}
                onOkClick={()=>navigate(-1)}
            />
        </>
    );
};

export default PasswordScreen;