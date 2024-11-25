# devCourse-nodePractice-todoList
## 데브코스 node, express 연습용
- 강의에서 배운 express와 get, post, put, delete를 이용한 간단한 프로젝트로 과제를 수행해보았습니다.
- 시작 방법
  - npm install
  - node ./server.js

### todoList
- todoList를 node와 express를 이용하여 구현해보기
- post : 일정 등록
- get : 일정 조회
- put : 일정 수정
- delete : 일정 삭제

### url
- /
  - 홈화면
  - 추가 버튼
  - 데이터가 없을 때 없다고 표시
  - 데이터가 있을 때 각 데이터별로 수정, 삭제 버튼
- /add
  - 일자, 할일 입력 필드
  - 추가 버튼
- /edit/:id
  - (put) 할일, 일자 수정
- /:id
  - (delete) id가 숫자가 아니라 "all"이면 전체 일정 삭제