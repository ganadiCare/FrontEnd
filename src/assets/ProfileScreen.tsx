import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks'
import type { components } from './service/api';
import './css/templete.css';
import './css/profile.css';

import { fetchPetThunk, updatePetThunk } from './store/petSlice';
import { fetchProfileThunk, logoutThunk, deleteMemberThunk } from './store/profileSlice';

import Header from './components/Header';
import Nav from './components/Nav';
import Popup from './components/Popup';

import defaultProfile from './image_folder/DefaultProfile.png';

type PetData = components['schemas']['PetDTO'];
type UpdatePetData = components['schemas']['UpdatePetDTO'];

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentScreen = 'profile';

  const { petData } = useAppSelector((state) => state.petSlice);
  const { profileData } = useAppSelector((state) => state.profileSlice);

  const [updatePet, setUpdatePet] = useState<PetData | null>(petData);
  
  const [petNameError, setPetNameError] = useState('');
  const [petAgeError, setPetAgeError] = useState('');
  const [petWeightError, setPetWeightError] = useState('');

  const [logoutPopup, setLogoutPopup] = useState(false);

  useEffect(() => {
    if (!petData) dispatch(fetchPetThunk());
    if (!profileData) dispatch(fetchProfileThunk());
  }, [dispatch, petData, profileData]);

  if (!updatePet && petData) {
    setUpdatePet(petData);
  }

  /* 데이터 변경 함수 */
  const changePet = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setUpdatePet((prev) => {
      const currentData = prev || {} as PetData;
      return {
        ...currentData,
        // 숫자 입력창이면 숫자로 변환해서 저장
        [name]: type === 'number' ? Number(value) : value,
      };
    });
  };

  /* 생일 변경 함수 */
  const changeBirthday = (type: 'month' | 'day' | 'unknown', e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setUpdatePet((prev) => {
      const currentData = prev || {} as PetData;
      const currentBirthday = currentData.birthday || '00-00';
      
      let [month, day] = currentBirthday.split('-');
      if (!month || !day) { month = '00'; day = '00'; }
      let newBirthday = currentBirthday;

      if (type === 'unknown') {
        const isChecked = (e.target as HTMLInputElement).checked;
        newBirthday = isChecked ? '00-00' : '01-01';
      } else {
        const value = e.target.value;
        newBirthday = type === 'month' ? `${value}-${day}` : `${month}-${value}`;
      }

      return {
        ...prev,
        birthday: newBirthday,
      } as PetData;
    });
  };

  const savePet = async() => {
    let check = true;

    if (!updatePet?.name?.trim()) {
      setPetNameError('이름을 입력해주세요.');
      check = false;
    } else {
      setPetNameError('');
    }

    if (!updatePet?.age) {
      setPetAgeError('나이를 입력해주세요.');
      check = false;
    } else if(updatePet?.age<0) {
      setPetAgeError('나이는 음수일 수 없습니다.');
      check = false;
    } else {
      setPetAgeError('')
    }

    if (!updatePet?.weight) {
      setPetWeightError('체중을 입력해주세요.');
      check = false;
    } else if (updatePet?.weight<=0) {
      setPetWeightError('체중은 0 이상이여야 합니다.');
      check = false;
    } else {
      setPetWeightError('')
    }

    if (check && updatePet) {
      const updateData: UpdatePetData = {
        name: updatePet.name ?? "",
        species: updatePet.species ?? "DOG",
        gender: updatePet.gender ?? "MALE",
        age: updatePet.age ?? 0,
        weight: updatePet.weight ?? 0,
        birthday: updatePet.birthday ?? "00-00"
      };
      dispatch(updatePetThunk(updateData));
    }
    return;
  }

  const logout = async() => {
    try{
      await dispatch(logoutThunk());
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  }

  return (
    <>
      <Header title='PROFILE'/>

      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        {/* 반려동물 프로필 영역 */}
        <section className="main-section">
          <div className='heading-wrapper'>
            <h2 className='section-heading'>반려동물 프로필</h2>
          </div>
          
          <form className='input-form' action="">
            <div className='input-box row'>
              <div className="profile-wrapper">
                <img
                  className="profile-image" 
                  src={defaultProfile}
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
                name="name"
                value={updatePet?.name}
                placeholder='반려동물 이름'
                onChange={changePet}
                />
              </label>
              <span className='message error'>{petNameError}</span>
            </div>

            <div className='input-box column'>
              <label className='input-label'>종류</label>
              <div className='radio-input-box'>
                <input type="radio" id='species-dog' className='radio-input' name='species'
                value='DOG' checked={updatePet?.species === 'DOG'} onChange={changePet}/>
                <label htmlFor="species-dog" className='radio-input-button'>강아지</label>
                <input type="radio" id='species-cat' className='radio-input' name='species' 
                value='CAT' checked={updatePet?.species === 'CAT'} onChange={changePet}/>
                <label htmlFor="species-cat" className='radio-input-button'>고양이</label>
                <input type="radio" id='species-etc' className='radio-input' name='species' 
                value='ETC' checked={updatePet?.species === 'ETC'} onChange={changePet}/>
                <label htmlFor="species-etc" className='radio-input-button'>기타</label>
              </div>
            </div>

            <div className='input-box column'>
              <label className='input-label'>성별</label>
              <div className='radio-input-box'>
                <input type="radio" id='gender-m' className='radio-input' name='gender'
                value='MALE' checked={updatePet?.gender === 'MALE'} onChange={changePet}/>
                <label htmlFor="gender-m" className='radio-input-button'>수컷</label>
                <input type="radio" id='gender-f' className='radio-input' name='gender'
                value='FEMALE' checked={updatePet?.gender === 'FEMALE'} onChange={changePet}/>
                <label htmlFor="gender-f" className='radio-input-button'>암컷</label>
              </div>
            </div>

            <div className='input-box column'>
              <label className='input-label'>나이</label>
              <div className='input-box row'>
                <input className='number-input'
                  type='number'
                  name="age"
                  value={updatePet?.age}
                  placeholder='반려동물 나이'
                  onChange={changePet}
                />
                <span className='medium-text'>살</span>
              </div>
              <span className='message error'>{petAgeError}</span>
            </div>

            <div className='input-box column'>
              <label className='input-label'>체중</label>
              <div className='input-box row'>
                <input className='number-input'
                  type='number'
                  name="weight"
                  value={updatePet?.weight}
                  placeholder='kg 단위로 입력 (ex. 5.2)'
                  onChange={changePet}
                />
                <span className='medium-text'>kg</span>
              </div>
              <p className='message error'>{petWeightError}</p>
            </div>

            <div className='input-box column'>
              <label className='input-label'>생일</label>
              <div className='select-input-box'>
                <select
                  className="select-input"
                  value={updatePet?.birthday?.split('-')[0]}
                  aria-label='month'
                  onChange={(e) => changeBirthday('month', e)}
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const m = String(i + 1).padStart(2, '0');
                    return <option key={m} value={m}>{m}월</option>;
                  })}
                </select>
                <select
                  className="select-input"
                  value={updatePet?.birthday?.split('-')[1]}
                  aria-label='day'
                  onChange={(e) => changeBirthday('day', e)}
                >
                  {Array.from({ length: 31 }, (_, i) => {
                    const d = String(i + 1).padStart(2, '0');
                    return <option key={d} value={d}>{d}일</option>;
                  })}
                </select>

                <div>
                  <label className="input-fixed-value">
                    <input
                      type="checkbox"
                      id="unknown-birthday"
                      className="checkbox-input"
                      onChange={(e)=>changeBirthday('unknown', e)}
                    />
                    생일 불명
                  </label>
                </div>
              </div>
            </div>

            <button type="button"
              className='medium-button'
              onClick={()=>savePet()}
            >저장하기</button>
          </form>
        </section>
        <hr className="main-divider" />

        {/* 기타 설정 영역 */}
        <section className="main-section">
          <div className='heading-wrapper'>
            <h2 className='section-heading'>사용자 설정</h2>
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
                <div className='input-box row'>
                  <input className='text-input'
                    type="text"
                    name="userName"
                    value={profileData?.nickname}
                    placeholder='사용자 이름'
                    //onChange={changeUserName}
                  />
                  <button type='button'
                    className='small-button'
                    //onClick={()=>saveUserName()}
                  >저장</button>
                </div>
              </label>
              {/* <p className='message error'>{userNameError}</p> */}
            </div>

            <div className='input-box row'>
              <label className='input-label'>아이디</label>
              <p className='input-fixed-value'>{profileData?.email ?? '???'}</p>
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
              <button type="button" className='medium-button'
                onClick={()=>setLogoutPopup(true)}
              >로그아웃</button>
              <button type="button" className='medium-button'>계정 삭제</button>
            </div>
          </form>
        </section>
      </main>

      <Popup
        popupMessage={
          {
            title: '정말로 로그아웃 하시겠습니까?',
            type: 'OX'
          }
        }
        visible={logoutPopup}
        onBackgroundClick={()=>setLogoutPopup(false)}
        onOkClick={()=>logout()}
        onCancelClick={()=>setLogoutPopup(false)}
      />

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default ProfileScreen;