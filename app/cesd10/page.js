// app/cesd10/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CESD10() {
  const router = useRouter();
  const [answers, setAnswers] = useState(Array(10).fill(null));

  const questions = [
    '1. 평소 아무렇지도 않던 것들이 귀찮고 괴롭게 느껴졌다',
    '2. 정신을 집중하기 힘들었다',
    '3. 우울하다고 생각했다',
    '4. 모든 일들이 힘들게 느껴졌다',
    '5. 비교적 잘 지냈다고 생각한다',
    '6. 무엇인가 두려움을 느꼈다',
    '7. 잠을 잘 이루지 못했다',
    '8. 큰 불만 없이 생활했다',
    '9. 세상에 홀로 있는 듯 한 외로움을 느꼈다',
    '10. 도무지 무얼 해갈 엄두가 나지 않았다',
  ];

  const options = [
    '1점 - 잠깐 그런 생각이 들었거나, 그런 생각이 들지 않았음',
    '2점 - 가끔 그런 생각이 들었음(1주일에 1~2일)',
    '3점 - 자주 그런 생각이 들었음(1주일에 3~4일)',
    '4점 - 항상 그런 생각이 들었음(1주일에 5일~7일)',
  ];

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = parseInt(value);
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save answers to localStorage
    localStorage.setItem('cesd10Answers', JSON.stringify(answers));
    router.push('/input-data');
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-center">CES-D10 우울척도</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="flex flex-col">
            <p className="mb-2">{question}</p>
            <div className="flex flex-col space-y-2">
              {options.map((option, oIndex) => (
                <label key={oIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={oIndex + 1}
                    onChange={(e) => handleChange(qIndex, e.target.value)}
                    required
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}
