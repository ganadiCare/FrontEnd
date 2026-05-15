import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Popup from './components/Popup';

interface Pet {
  petId: number;
  petName: string;
  petImage: string;
  species: string;
  gender: string;
  weight: number;
  age: number;
  birthday: string;
}

interface User {
  usetId: string;
  userName: string;
}


interface MainScreenProps {
  pet?: Pet;
  user?: User;
}

const MainScreen: React.FC<MainScreenProps> = (
  {pet, user}
) => {
  const currentScreen = 'profile';
  const [petData, setPetData] = useState(pet);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setPetData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        // 숫자 입력창이면 숫자로 변환해서 저장
        [name]: type === 'number' ? Number(value) : value,
      };
    });
  };

  return (
    <>
      <ToastContainer/>
      <Header title='PROFILE'/>

      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        {/* 반려동물 프로필 영역 */}
        <section className="main-section">
          <div className='heading-wrapper'>
            <h3 className='section-heading'>반려동물 프로필</h3>
          </div>
          
          <form className='input-form' action="">
            <div className='input-box row'>
              <div className="profile-wrapper">
                <img
                    className="profile-image" 
                    src={petData ? petData?.petImage : ''}
                    alt="profile image"
                />
              </div>
              <input
                type="file"
                id="pet-image"
                className='file-input'
                accept="image/*"
              />
              <label 
                htmlFor="pet-image" 
                className='small-button'
              >이미지 변경</label>
            </div>

            <div className='input-box column'>
              <label className='input-label'>이름
                <input className='text-input'
                type="text"
                value={petData?.petName}
                placeholder='반려동물 이름'
                />
              </label>
            </div>

            <div className='input-box column'>
              <label className='input-label'>종류</label>
              <div className='radio-input-box'>
                <input type="radio" id='species-dog' className='radio-input' name='species'
                value='dog' onChange={handleInputChange}/>
                <label htmlFor="species-dog" className='radio-input-button'>강아지</label>
                <input type="radio" id='species-cat' className='radio-input' name='species' 
                value='cat' onChange={handleInputChange}/>
                <label htmlFor="species-cat" className='radio-input-button'>고양이</label>
                <input type="radio" id='species-etc' className='radio-input' name='species' 
                value='etc' onChange={handleInputChange}/>
                <label htmlFor="species-etc" className='radio-input-button'>기타</label>
              </div>
            </div>

            <div className='input-box column'>
              <label className='input-label'>성별</label>
              <div className='radio-input-box'>
                <input type="radio" id='gender-m' className='radio-input' name='gender'
                value='male' onChange={handleInputChange}/>
                <label htmlFor="gender-m" className='radio-input-button'>수컷</label>
                <input type="radio" id='gender-f' className='radio-input' name='gender'
                value='female' onChange={handleInputChange}/>
                <label htmlFor="gender-f" className='radio-input-button'>암컷</label>
              </div>
            </div>

            <div className='input-box column'>
              <label className='input-label'>나이
                <input className='number-input'
                type='number'
                value={petData?.age}
                placeholder='반려동물 나이'
                />
              </label>
            </div>

            <div className='input-box column'>
              <label className='input-label'>체중
                <input className='number-input'
                type='number'
                value={petData?.weight}
                placeholder='kg 단위로 입력 (ex. 5.2)'
                />
              </label>
            </div>

            <div className='input-box column'>
              <label className='input-label'>생일</label>
              <div className='select-input-box'>
                <select className="select-input" value={petData?.birthday?.split('-')[0]} aria-label='month'>
                  {Array.from({ length: 12 }, (_, i) => {
                    const m = String(i + 1).padStart(2, '0');
                    return <option key={m} value={m}>{m}월</option>;
                  })}
                </select>
                <select className="select-input" value={petData?.birthday?.split('-')[1]} aria-label='day'>
                  {Array.from({ length: 31 }, (_, i) => {
                    const d = String(i + 1).padStart(2, '0');
                    return <option key={d} value={d}>{d}일</option>;
                  })}
                </select>
              </div>
            </div>
            <button type="button" className='medium-button'
            onClick={()=>toast('저장되었습니다.')}
            >저장하기</button>
          </form>
        </section>
        <hr className="main-divider" />

        {/* 기타 설정 영역 */}
        <section className="main-section">
          <div className='heading-wrapper'>
            <h3 className='section-heading'>사용자 설정</h3>
          </div>

          <form className='input-form' action="">
            <div className='input-box row'>
              <label htmlFor="push-toggle"className='input-label'>푸쉬 알림</label>
              <input type="checkbox" id="push-toggle" className="toggle-input" />
              <label htmlFor="push-toggle" className="toggle-input-button">
                <span className="toggle-input-switch"/>
              </label>
            </div>

            <div className='input-box column'>
              <label className='input-label'>이름
                <input className='text-input'
                type="text"
                value={user?.userName}
                placeholder='사용자 이름'
                />
              </label>
            </div>

            <div className='input-box row'>
              <label className='input-label'>아이디</label>
              <p className='input-fixed-value'>{user?.usetId ?? '???'}</p>
            </div>

            <div className='input-box row'>
              <label className='input-label'>비밀번호 변경</label>
              <button type="button" className='small-button'>변경하기</button>
            </div>

            <div className='input-box row'>
              <label className='input-label'>앱 버전</label>
              <p className='input-fixed-value'>{'???'}</p>
            </div>

            <div className='input-box row'>
              <button type="button" className='medium-button'>로그아웃</button>
              <button type="button" className='medium-button'>계정 삭제</button>
            </div>
          </form>
        </section>
      </main>

      <Popup
        //popupMessage={mediaInfo()}
        //visible={usePopup}
        //onBackgroundClick={()=>setUsePopup(false)}
      />

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default MainScreen;