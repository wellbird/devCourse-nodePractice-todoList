function throwDeleteMethod(id) {
  const url = id === 'all' ? '/' + id : '/' + id;
  fetch(url, {
    method: 'DELETE',
  }).then((response) => {
    if (response.ok) {
      alert('삭제되었습니다.');
      location.reload();
    } else {
      alert('삭제할 데이터가 없습니다.');
    }
  });
}
