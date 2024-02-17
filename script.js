const postBtn = document.querySelector('.post')
const getBtn = document.querySelector('.get')
const patchBtn = document.querySelector('.patch')
const deleteBtn = document.querySelector('.delete')
const container = document.querySelector('.container')
const list = document.querySelector('.posts')
const likebtn = document.querySelector('.likes')


const postData = (url, product) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(product),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const getData = url => {
	return new Promise((resolve, reject) =>
	fetch(url)
	  .then(response => response.json())
	  .then(json => resolve(json))
	  .catch(error => reject(error))
	)
  }

 
  const patchData = (url, product) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(product),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const delData = url => {
	return new Promise((resolve, reject) =>
		fetch(url, { method: 'DELETE' })
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

// добавить новый пост
postBtn.addEventListener('click', async e => {
	e.preventDefault()
	let title = prompt('введите название вашего поста')
	let likes = Number(prompt('введите кол. лайков'))
	let dislikes = Number(prompt('введите кол. дизлайков'))
	let comments = prompt('введите комментарий')
	try {
		await postData('http://localhost:3000/posts', {
			title,
			likes,
			dislikes,
			comments
		}).then(response => {
			console.log(response, 'пост успешно добавлен')
		})
	} catch (error) {
		console.error(error)
	}
})

//
getBtn.addEventListener('click', async e => {
e.preventDefault()	
	try{

		const posts = await getData('http://localhost:3000/posts')
		posts.forEach(post => {
			list.insertAdjacentHTML(
			  'beforeend',
			  `
			  <div class="post__">
			  <div class="likes">
			  <h1>${post.likes}</h1>
			  </div>
				<div class="post_">
				<p class="titlePost">Название поста:${post.title}</p>
				<p class="likesPost">Лайки:${post.likes}</p>
				<p class="dislikesPost">Дизлайки:${post.dislikes}</p>
				<p class="idPost">id:${post.id}</p>
				</div>
				<div class="dislikes">
				<h1>${post.dislikes}</h1>
				</div>
				</div>
			`
			
			)
			const likebtn = document.querySelector('.likes')
			likebtn.addEventListener('click', async e => {
				e.preventDefault()
				const postContainer = e.target.closest('.post__')
				const id = postContainer.querySelector('.idPost').textContent.split(':')[1]
				const likesElem = postContainer.querySelector('.likesPost')
				let currentLikes = Number(likesElem.textContent.split(':')[1])
				currentLikes++
			  
				try {
				  await patchData(`http://localhost:3000/posts/${id}`, {
					likes: currentLikes
				  }).then(response => {	
					likesElem.textContent = `Лайки:${currentLikes}`
				  })
				} catch (error) {
				  console.error(error, 'не получилось обновить данные')
				}
			  })
			  const dislikebtn = document.querySelector('.dislikes')
			  dislikebtn.addEventListener('click', async e => {
				e.preventDefault()
				const postContainer = e.target.closest('.post__')
				const postId = postContainer.querySelector('.idPost').textContent.split(':')[1]
				const dislikesElem = postContainer.querySelector('.dislikesPost')
				let currentDislikes = Number(dislikesElem.textContent.split(':')[1])
				currentDislikes++
			  
				try {
				  await patchData(`http://localhost:3000/posts/${postId}`, {
					dislikes: currentDislikes
				  }).then(response => {
					dislikesElem.textContent = `Лайки:${currentDislikes}`
				  })
				} catch (error) {
				  console.error(error, 'не получилось обновить данные')
				}
			  })


		  })
	  }
	  
	  catch(err){
		console.error(err)
	  }
  })
  

  patchBtn.addEventListener('click', async e => {
	e.preventDefault()
	let id = prompt('введите id поста')
	let title = prompt('введите название')
	let likes = prompt('введите кол. лайков')
	let dislikes = prompt('ввдите кол. дизлайков')
	try {
		await patchData(`http://localhost:3000/posts/${id}`, {
			title,
			likes,
			dislikes,
		}).then(response => {
			console.log(response, 'пост успешно обновлен')
		})
	} catch (error) {
		console.error(error, 'не получилось обновить данные')
	}
})

// удалить продукт
deleteBtn.addEventListener('click', async e => {
	e.preventDefault()
	const id = prompt('введите id')
	try {
		delData(`http://localhost:3000/posts/${id}`).then(response => {
			console.log(response, `продукт с id = ${id} успешно удалён`)
		})
	} catch (err) {
		console.error(err, 'ошибка при удалении')
	}
})




