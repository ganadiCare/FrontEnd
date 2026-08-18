import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from './store/useProfile';
import './css/templete.css';
import './css/profiledelete.css';

import Header from './components/Header';

const ProfileDeleteScreen: React.FC = () => {
  const navigate = useNavigate();
  const { userDelete, isDeletingMember } = useProfile();
  const [agreed, setAgreed] = useState(false);

  const handleDelete = () => {
    userDelete(undefined, {
      onSuccess: () => navigate('/', { replace: true }),
    });
  };

  return (
    <>
      <Header title="회원탈퇴" useNotice={false} />

      <main className="main-content full">
        <section className="main-section">
          <div className="delete-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 L22 20 H2 Z" fill="#e53935" />
              <rect x="11" y="9" width="2" height="6" rx="1" fill="#fff" />
              <rect x="11" y="16" width="2" height="2" rx="1" fill="#fff" />
            </svg>
          </div>

          <p className="delete-warning">
            회원 탈퇴 시 고객님의 모든 정보가 소멸되며{'\n'}
            이전으로 <span className="red">복구 불가능</span>합니다
          </p>

          <ul className="delete-notice-list">
            <li>등록된 반려동물 정보와 기기, 리포트 데이터가 모두 삭제됩니다.</li>
            <li>삭제 후에는 고객센터를 통한 복구가 불가능합니다.</li>
          </ul>
        </section>
      </main>

      <div className="delete-footer">
        <label className="delete-agree">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          안내 사항을 모두 확인했으며 동의합니다.
        </label>

        <div className="delete-buttons">
        <button
          type="button"
          className="delete-outline-button"
          onClick={handleDelete}
          disabled={!agreed || isDeletingMember}
        >
          {isDeletingMember ? '처리 중...' : '회원탈퇴'}
        </button>

        <button
          type="button"
          className="medium-button"
          onClick={() => navigate(-1)}
        >
          취소하기
        </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDeleteScreen;
