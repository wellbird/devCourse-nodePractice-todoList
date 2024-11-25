function throwPutMethod(event, id) {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const task = document.getElementById('task').value;

  fetch(`/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date, task }),
  })
    .then((res) => {
      if (res.ok) {
        alert('일정이 수정되었습니다.');
        location.href = '/';
      } else {
        alert('존재하지 않는 일정입니다.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다.');
    });
}
