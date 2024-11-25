function throwPostMethod(event, id) {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const task = document.getElementById('task').value;

  fetch(`/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date, task }),
  })
    .then((res) => {
      if (res.ok) {
        alert('일정이 등록되었습니다.');
        location.href = '/';
      } else {
        alert('등록에 실패하였습니다.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다.');
    });
}
