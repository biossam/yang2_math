# yang2수학 · 초등 수학 복습

고양이·강아지와 함께하는 초등 1~6학년 수학 복습 사이트입니다.
👉 https://biossam.github.io/yang2_math/

## 무엇이 들어 있나요
- **1~6학년 71개 개념** (2022 개정 4영역: 수와 연산 · 변화와 관계 · 도형과 측정 · 자료와 가능성), 학년·학기별로 고르기
- 개념마다 핵심 정리 · 플래시카드 · 백지 테스트(말로 설명하기 녹음) · 문제
- **문제 생성기 140여 개** — 풀 때마다 새 숫자, 시계·분수·그래프·도형 그림 자동 생성
- 하루 흐름: 오늘의 3문제(어제 틀린 문제 먼저) / 추천 15분 / 개념 골라서 15분
- 보상: 문제 세트를 끝내면 숨은 친구 찾기 → 도감(고양이 100종 · 강아지 50종), 미니홈피(방 꾸미기, 숨바꼭질, 셀카, 집사 꾸미기), 친구랑 놀기(실시간)

## 폴더
- `src/core.html` 앱 틀, `src/c0~c9*.js` 학년별 개념·문제 생성기, `src/pets.js` 고양이·강아지
- `minihome/` 미니홈피 모듈(room·jibsa·party)
- `party/` 친구랑 놀기 서버 (Node, 외부 패키지 없음) · `render.yaml`
- `tools/build.py` → `app.html` 만들기 / `test/` 검산·화면 점검

## 고칠 때
```
python3 tools/build.py        # app.html 다시 만들기
python3 test/gen_check.py     # 모든 생성기 400번씩 돌려 정답·표기 검사
```

## 친구랑 놀기 서버 켜기 (한 번만)
Render → New → Blueprint → 이 저장소 선택 → Deploy.
서비스 이름은 `nyangmeong-party`(주소 https://nyangmeong-party.onrender.com). 이름이 달라지면 `minihome/party.js`의 `PT_URL`을 바꾸고 다시 빌드하세요.
무료 서버는 잠들어 있어서 첫 연결에 30초~1분 걸릴 수 있어요.
