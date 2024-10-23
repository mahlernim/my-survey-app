// app/input-data/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InputData() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    residence: '',
    livingAlone: '',
    dentures: '',
    pain: '',
    income: '',
    gatherings: '',
    hearing: '',
    vision: '',
    siblings: '',
    meetingsFrequency: '',
  });

  const [cesd10Score, setCesd10Score] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // CES-D10 응답을 localStorage에서 가져오기
    const cesd10Answers = JSON.parse(localStorage.getItem('cesd10Answers')) || [];
    // CES-D10 점수 계산
    const reverseScoredItems = [4, 7]; // 역산 항목 (5번, 8번)
    let score = 0;
    cesd10Answers.forEach((answer, index) => {
      if (reverseScoredItems.includes(index)) {
        score += 5 - answer; // 역산 점수
      } else {
        score += answer;
      }
    });
    setCesd10Score(score);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;

    // 체크박스나 라디오 버튼 처리
    if (type === 'radio') {
      finalValue = value;
    } else if (type === 'checkbox') {
      finalValue = checked ? '1' : '0';
    }

    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData, cesd10Score };
    console.log('Final Data:', finalData);
    setSubmitted(true);
    // 필요 시 데이터를 서버로 전송할 수 있습니다.
  };

  if (submitted) {
    return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">설문이 완료되었습니다.</h2>
        <h3 className="text-xl mb-4">결과 JSON:</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify({ ...formData, cesd10Score }, null, 2)}
        </pre>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push('/cesd10')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            처음으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-center">후발성 우울증 예측 기계학습 알고리즘</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. 연령 */}
        <div className="flex flex-col">
          <label htmlFor="age" className="mb-2">
            1. 연령:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
              className="border border-gray-300 rounded px-3 py-2 w-24"
            />
            <span>세</span>
          </div>
        </div>

        {/* 2. 성별 */}
        <div className="flex flex-col">
          <label className="mb-2">2. 성별:</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="1"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span>남성</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="0"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-pink-600"
              />
              <span>여성</span>
            </label>
          </div>
        </div>

        {/* 3. 거주지 */}
        <div className="flex flex-col">
          <label className="mb-2">3. 거주지:</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="residence"
                value="1"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-green-600"
              />
              <span>대도시 (서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="residence"
                value="0"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-yellow-600"
              />
              <span>기타 도시/시골</span>
            </label>
          </div>
        </div>

        {/* 4. 단독거주 여부 */}
        <div className="flex flex-col">
          <label className="mb-2">4. 단독거주 여부:</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="livingAlone"
                value="1"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-purple-600"
              />
              <span>단독</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="livingAlone"
                value="0"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-red-600"
              />
              <span>동거</span>
            </label>
          </div>
        </div>

        {/* 5. 평소 틀니 착용 */}
        <div className="flex flex-col">
          <label className="mb-2">5. 평소 틀니 착용:</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="dentures"
                value="1"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span>착용</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="dentures"
                value="0"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-gray-600"
              />
              <span>미착용</span>
            </label>
          </div>
        </div>

        {/* 6. 통증으로 일상생활 불편함 */}
        <div className="flex flex-col">
          <label className="mb-2">6. 통증으로 일상생활 불편함:</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="pain"
                value="1"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-teal-600"
              />
              <span>있음</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="pain"
                value="0"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-orange-600"
              />
              <span>없음</span>
            </label>
          </div>
        </div>

        {/* 7. 동거 가족 소득의 합 */}
        <div className="flex flex-col">
          <label className="mb-2">7. 동거 가족 소득의 합:</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="income"
                value="1"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-pink-600"
              />
              <span>1년에 1,000만원 이하</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="income"
                value="0"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span>1,000만원 초과</span>
            </label>
          </div>
        </div>

        {/* 8. 모임 */}
        <div className="flex flex-col">
          <label className="mb-2">8. 모임(종교, 친목, 동창회, 봉사, 문화센터 등):</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gatherings"
                value="1"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-green-600"
              />
              <span>있음 (1개 이상)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gatherings"
                value="0"
                onChange={handleChange}
                required
                className="form-radio h-4 w-4 text-gray-600"
              />
              <span>없음</span>
            </label>
          </div>
        </div>

        {/* 9. 청력 */}
        <div className="flex flex-col">
          <label htmlFor="hearing" className="mb-2">
            9. 청력:
          </label>
          <select
            id="hearing"
            name="hearing"
            value={formData.hearing}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">선택하세요</option>
            <option value="1">매우 좋음</option>
            <option value="2">좋은편</option>
            <option value="3">보통</option>
            <option value="4">나쁜편</option>
            <option value="5">매우 나쁨</option>
          </select>
        </div>

        {/* 10. 시력 */}
        <div className="flex flex-col">
          <label htmlFor="vision" className="mb-2">
            10. 시력:
          </label>
          <select
            id="vision"
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">선택하세요</option>
            <option value="1">매우 좋음</option>
            <option value="2">좋은편</option>
            <option value="3">보통</option>
            <option value="4">나쁜편</option>
            <option value="5">매우 나쁨</option>
          </select>
        </div>

        {/* 11. 생존한 형제자매 수 */}
        <div className="flex flex-col">
          <label htmlFor="siblings" className="mb-2">
            11. 생존한 형제자매 수:
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              id="siblings"
              name="siblings"
              value={formData.siblings}
              onChange={handleChange}
              required
              min="0"
              className="border border-gray-300 rounded px-3 py-2 w-24"
            />
            <span>명</span>
          </div>
        </div>

        {/* 12. 친한 사람 만남 횟수 */}
        <div className="flex flex-col">
          <label htmlFor="meetingsFrequency" className="mb-2">
            12. 친한 사람 만남 횟수:
          </label>
          <select
            id="meetingsFrequency"
            name="meetingsFrequency"
            value={formData.meetingsFrequency}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">선택하세요</option>
            <option value="1">거의 만나지 않음</option>
            <option value="2">1년에 1~2회 정도</option>
            <option value="3">2~5개월에 1회 정도</option>
            <option value="4">1달에 1~3회 정도</option>
            <option value="5">1주일에 1회 이상</option>
          </select>
        </div>

        {/* 13. CES-D10 우울척도 점수 */}
        <div className="flex flex-col">
          <label className="mb-2">13. CES-D10 우울척도:</label>
          <span className="text-lg font-semibold">{cesd10Score} 점</span>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            제출
          </button>
        </div>
      </form>
    </div>
  );
}
