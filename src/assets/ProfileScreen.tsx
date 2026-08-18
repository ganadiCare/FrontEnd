import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePet } from './store/usePet';
import { useProfile } from './store/useProfile';
import { calculatePetTargets } from './utils/petTarget';
import type { components } from './service/api';
import './css/templete.css';
import './css/profile.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Popup from './components/Popup';
import Loading from './components/Loading';

import profile_dog from './image_folder/Profile_Dog.png';
import profile_cat from './image_folder/Profile_Cat.png';

type PetData = components['schemas']['PetDTO'];
type UpdatePetData = components['schemas']['UpdatePetDTO'];

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const currentScreen = 'profile';

  const { petData, isPetLoading, updatePet, isUpdatingPet } = usePet();
  const { profileData, isProfileLoading, userLogout, updateNickname, isUpdatingNickname } = useProfile();

  const [localPet, setLocalPet] = useState<PetData | null>(petData);
  const [birthdayNull, setBirthdayNull] = useState(petData?.birthday=='1900-01-01');
  const [petNameError, setPetNameError] = useState('');
  const [petAgeError, setPetAgeError] = useState('');
  const [petWeightError, setPetWeightError] = useState('');

  const [prevUser, setPrevUser] = useState(profileData);
  const [userName, setUserName] = useState(profileData?.nickname ?? '');
  const [userNameError, setUserNameError] = useState('');

  const [targetPopup, setTargetPopup] = useState(false);
  const [logoutPopup, setLogoutPopup] = useState(false);

  if (!localPet && petData) {
    setLocalPet(petData);
    setBirthdayNull(petData?.birthday=='1900-01-01')
  }

  if (profileData !== prevUser) {
    setPrevUser(profileData);
    setUserName(profileData?.nickname ?? '');
  }

  /* 데이터 변경 함수 */
  const changePet = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setLocalPet((prev) => {
      const currentData = prev || {} as PetData;
      return {
        ...currentData,
        // 숫자 입력창이면 숫자로 변환해서 저장
        [name]: type === 'number' ? Number(value) : value,
      };
    });
  };

  // 생년 설정 함수
  const setBirthYear = () => {
    setLocalPet((prev) => {
      const currentData = prev || {} as PetData;
      const birthYear = currentData ? new Date().getFullYear() - (currentData.age ?? 0)+ 1 : null;

      const currentBirthday = currentData.birthday ?? '1900-01-01';
      const [year, month, day] = currentBirthday.split('-');

      return {
        ...prev,
        birthday: `${birthYear}-${month}-${day}`,
      } as PetData;
    });
  }

  /* 생일 변경 함수 */
  const changeBirthday = (type: 'MONTH' | 'DAY', e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setLocalPet((prev) => {
      const currentData = prev || {} as PetData;
      const currentBirthday = currentData.birthday ?? '1900-01-01';
      
      const [year, month, day] = currentBirthday.split('-');
      let newBirthday = currentBirthday;

      const value = e.target.value;
      newBirthday = type === 'MONTH' ? `${year}-${value}-${day}` : `${year}-${month}-${value}`;

      return {
        ...prev,
        birthday: newBirthday,
      } as PetData;
    });
  }

  const handleBirthdayNull = () => {
    const mode = !birthdayNull;
    setBirthdayNull(mode);
    if (!mode) setBirthYear();
  }

  const savePet = async() => {
    let check = true;

    if (!localPet?.name?.trim()) {
      setPetNameError('이름을 입력해주세요.');
      check = false;
    } else {
      setPetNameError('');
    }

    if (!localPet?.age) {
      setPetAgeError('나이를 입력해주세요.');
      check = false;
    } else if(localPet?.age<0) {
      setPetAgeError('나이는 음수일 수 없습니다.');
      check = false;
    } else {
      setPetAgeError('')
    }

    if (!localPet?.weight) {
      setPetWeightError('체중을 입력해주세요.');
      check = false;
    } else if (localPet?.weight<=0) {
      setPetWeightError('체중은 0 이상이여야 합니다.');
      check = false;
    } else {
      setPetWeightError('')
    }

    let birthday;
    if (birthdayNull) {
      birthday = '1900-01-01';
    } else {
      birthday = localPet?.birthday ?? '1900-01-01';
    }

    if (check && localPet) {
      const updateData: UpdatePetData = {
        name: localPet.name ?? "",
        species: localPet.species ?? "DOG",
        gender: localPet.gender ?? "MALE",
        age: localPet.age ?? 0,
        weight: localPet.weight ?? 0,
        birthday: birthday
      };
      updatePet(updateData);
    }
    return;
  }

  // 닉네임 변경 함수
  const changeUserName = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserName(e.target.value);
  }

  const saveUserName = () => {
    if (!userName?.trim()) {
      setUserNameError('이름을 입력해주세요.');
    }
    else {
      setUserNameError('');
      updateNickname({nickname: userName})
    }
  }

  // 로그아웃
  const logout = async() => {
    try{
      userLogout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  }

  //목표값 계산
  const maxValue = calculatePetTargets(petData)

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
            {/*
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
            */}
            <div className='input-box row'>
              <div className="profile-wrapper">
                <img
                  className="profile-image" 
                  src={petData?.species=='CAT' ? profile_cat : profile_dog}
                  alt="profile image"
                />
              </div>

              <div className='input-box column'>
                <label className='input-label'>이름
                  <input className='text-input'
                  type="text"
                  name="name"
                  value={localPet?.name}
                  placeholder='반려동물 이름'
                  onChange={changePet}
                  />
                </label>
                <span className='message error'>{petNameError}</span>
              </div>
            </div>

            <div className='input-box column'>
              <label className='input-label'>종류</label>
              <div className='radio-input-box'>
                <input type="radio" id='species-dog' className='radio-input' name='species'
                value='DOG' checked={localPet?.species === 'DOG'} onChange={changePet}/>
                <label htmlFor="species-dog" className='radio-input-button'>강아지</label>
                <input type="radio" id='species-cat' className='radio-input' name='species' 
                value='CAT' checked={localPet?.species === 'CAT'} onChange={changePet}/>
                <label htmlFor="species-cat" className='radio-input-button'>고양이</label>
                <input type="radio" id='species-etc' className='radio-input' name='species' 
                value='ETC' checked={localPet?.species === 'ETC'} onChange={changePet}/>
                <label htmlFor="species-etc" className='radio-input-button'>기타</label>
              </div>
            </div>

            <div className='input-box column'>
              <label className='input-label'>성별</label>
              <div className='radio-input-box'>
                <input type="radio" id='gender-m' className='radio-input' name='gender'
                value='MALE' checked={localPet?.gender === 'MALE'} onChange={changePet}/>
                <label htmlFor="gender-m" className='radio-input-button'>수컷</label>
                <input type="radio" id='gender-f' className='radio-input' name='gender'
                value='FEMALE' checked={localPet?.gender === 'FEMALE'} onChange={changePet}/>
                <label htmlFor="gender-f" className='radio-input-button'>암컷</label>
              </div>
            </div>

            <div className='input-box column'>
              <label className='input-label'>나이</label>
              <div className='input-box row'>
                <input className='number-input'
                  type='number'
                  name="age"
                  value={localPet?.age}
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
                  value={localPet?.weight}
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
                  value={localPet?.birthday?.split('-')[1]}
                  aria-label='month'
                  disabled={birthdayNull}
                  onChange={(e) => changeBirthday('MONTH', e)}
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const m = String(i + 1).padStart(2, '0');
                    return <option key={m} value={m}>{m}월</option>;
                  })}
                </select>
                <select
                  className="select-input"
                  value={localPet?.birthday?.split('-')[2]}
                  aria-label='day'
                  disabled={birthdayNull}
                  onChange={(e) => changeBirthday('DAY', e)}
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
                      checked={birthdayNull}
                      onChange={handleBirthdayNull}
                    />
                    생일 불명
                  </label>
                </div>
              </div>
            </div>

            <div className='input-box row'>
              <button type="button"
                className='medium-button'
                onClick={()=>savePet()}
              >{isUpdatingPet ? '저장 중...' : '저장하기'}</button>

              <button type="button"
                className='medium-button'
                onClick={()=>setTargetPopup(true)}
              >일일 권장 목표</button>
            </div>
          </form>
        </section>
        <hr className="main-divider" />

        {/* 기타 설정 영역 */}
        <section className="main-section">
          <div className='heading-wrapper'>
            <h2 className='section-heading'>사용자 설정</h2>
          </div>

          <form className='input-form' action="">
            {/*<div className='input-box row'>
              <label htmlFor="push-toggle"className='input-label'>푸쉬 알림</label>
              <input type="checkbox" id="push-toggle" className="toggle-input" />
              <label htmlFor="push-toggle" className="toggle-input-button">
                <span className="toggle-input-switch"/>
              </label>
            </div>*/}

            <div className='input-box column'>
              <label className='input-label'>이름
                <div className='input-box row'>
                  <input className='text-input'
                    type="text"
                    name="userName"
                    value={userName}
                    placeholder='사용자 이름'
                    onChange={changeUserName}
                  />
                  <button type='button'
                    className='small-button'
                    onClick={()=>saveUserName()}
                  >{isUpdatingNickname ? '저장 중...' : '저장'}</button>
                </div>
              </label>
              <p className='message error'>{userNameError}</p>
            </div>

            <div className='input-box row'>
              <label className='input-label'>아이디</label>
              <p className='input-fixed-value'>{profileData?.email ?? '???'}</p>
            </div>

            <div className='input-box row'>
              <label className='input-label'>비밀번호 변경</label>
              <button type="button" className='small-button'
                onClick={()=>navigate('/profile/password')}
              >변경하기</button>
            </div>

            <div className='input-box row'>
              <label className='input-label'>앱 버전</label>
              <p className='input-fixed-value'>{'???'}</p>
            </div>

            <div className='input-box row'>
              <button type="button" className='medium-button'
                onClick={()=>setLogoutPopup(true)}
              >로그아웃</button>

              <button type="button" className='medium-button'
                onClick={()=>navigate('/profile/delete')}
              >회원탈퇴</button>
            </div>
          </form>
        </section>
      </main>

      <Popup
        popupMessage={
          {
            title: '일일 권장 목표',
            content: (
              <>
              <div className='section-box column'>
                <span className="medium-text">활동량 : {petData ? `${maxValue.maxActivity}분` : '-'}</span>
                <span className="medium-text">사료 섭취량 : {petData ? `${maxValue.maxFeed}g` : '-'}</span>
                <span className="medium-text">수분 섭취량 : {petData ? `${maxValue.maxWater}ml` : '-'}</span>
              </div>
              <span className="message">* 본 권장량은 표준 계산식에 따른 가이드라인으로,
                  아이의 건강 상태 및 수의사 진단에 따라 달라질 수 있습니다.</span>
              </>
            ),
            type: 'OK'
          }
        }
        visible={targetPopup}
        onBackgroundClick={()=>setTargetPopup(false)}
        onOkClick={()=>setTargetPopup(false)}
      />

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

      <Loading visible={isPetLoading || isProfileLoading}></Loading>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default ProfileScreen;