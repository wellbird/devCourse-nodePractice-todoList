const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

let db = new Map();
let id = 1;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const todoIds = Array.from(db.keys());
  const todoList = todoIds
    .map((id) => {
      const todoInfo = db.get(id);
      return `
        <div class="todo-item">
          <p>일자: ${todoInfo.date}, 할일: ${todoInfo.task}</p>
          <div class="button-container">
            <button onclick="location.href='/edit/${id}'">수정</button>
            <button onclick="throwDeleteMethod(${id})">삭제</button>
          </div>
        </div>
      `;
    })
    .join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="kr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/home.style.css" />
        <script src="/js/throwDeleteMethod.js"></script>
        <title>Todo List</title>
      </head>
      <body>
        <div class="container">
          <h1>할 일 목록</h1>
          <button onclick="location.href='/add'">일정 추가</button>
          <button onclick="throwDeleteMethod('all')">전체 삭제</button>
          <hr/>
          <h3>일정 목록</h3>
          ${db.size > 0 ? todoList : '<p>데이터가 없습니다.</p>'}
        </div>
      </body>
    </html>
  `);
});

app.get('/add', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="kr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/add.style.css" />
        <script src="/js/throwPostMethod.js"></script>
        <title>일정 추가</title>
      </head>
      <body>
        <div class="container">
          <h1>일정 추가</h1>
          <form action="/add" method="POST" onsubmit="return throwPostMethod(event, ${id})">
            <input type="date" id="date" name="date" required>
            <input type="text" id="task" name="task" placeholder="할 일" required>
            <button type="submit">추가</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

app.post('/add', (req, res) => {
  const { date, task } = req.body;
  db.set(id++, { date, task });

  res.status(200).json({ message: '일정 정보가 등록되었습니다.' });
});

app.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = db.get(id);

  if (!todo) {
    return res.status(404).send('일정을 찾을 수 없습니다.');
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="kr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/edit.style.css" />
        <script src="/js/checkUserInput.js"></script>
        <script src="/js/throwPutMethod.js"></script>
        <title>일정 수정</title>
      </head>
      <body>
        <div class="container">
          <h1>일정 수정</h1>
          <form action="/edit/${id}" method="PUT" onsubmit="return throwPutMethod(event, ${id})">
            <input type="date" id="date" name="date" value="${todo.date}" required>
            <input type="text" id="task" name="task" value="${todo.task}" required>
            <button type="submit">수정</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

app.put('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { date, task } = req.body;

  if (db.has(id)) {
    db.set(id, { date, task });
    return res.status(200).json({ message: '일정 정보가 수정되었습니다.' });
  } else {
    return res.status(404).json({ message: '존재하지 않는 일정 데이터입니다.' });
  }
});

app.delete('/:id', (req, res) => {
  let id = req.params.id;

  if (id === 'all') {
    if (db.size === 0) {
      return res.status(404).json({ message: '삭제할 데이터가 없습니다.' });
    } else {
      db = new Map();
      return res.status(200).json({ message: '전체 데이터가 삭제되었습니다.' });
    }
  } else {
    id = parseInt(id);
    if (db.get(id) === undefined) {
      return res.status(404).json({ message: '존재하지 않는 일정 데이터입니다.' });
    } else {
      db.delete(id);
      return res.status(200).json({ message: '삭제되었습니다.' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`서버 열림 : http://localhost:${PORT}`);
});
