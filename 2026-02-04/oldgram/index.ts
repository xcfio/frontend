import { posts } from "./post.js"
const main = document.getElementById("main")

function renderString(user: (typeof posts)[number]) {
    return `
        <article class="bg-white flex flex-col">
            <header class="flex justify-start items-center gap-4 p-4">
                <img 
                    class="w-[10%] h-[10%] rounded-full" 
                    src="${user.avatar}" 
                    alt="A photo of ${user.name}" 
                />
                <div>
                    <h2 class="font-black">${user.name}</h2>
                    <p>${user.location}</p>
                </div>
            </header>
            <figure aria-label="User post image">
                <img
                    class="w-[100%]"
                    src="${user.post}"
                    alt="A post by ${user.username}"
                />
            </figure>
            <section class="flex flex-col m-4" aria-label="Post details">
                <div class="flex justify-start items-center gap-4 mb-2" aria-label="Post actions">
                    <img
                        class="w-[8%] h-[8%] hover:opacity-50 transition-opacity duration-100"
                        src="images/icon-heart.png"
                        alt="Heart icon for liking the post"
                    />
                    <img
                        class="w-[8%] h-[8%] hover:opacity-50 transition-opacity duration-100"
                        src="images/icon-comment.png"
                        alt="Comment icon for commenting on the post"
                    />
                    <img
                        class="w-[8%] h-[8%] hover:opacity-50 transition-opacity duration-100"
                        src="images/icon-dm.png"
                        alt="Direct message icon for sending a direct message"
                    />
                </div>
                <p class="mb-2 font-bold">${user.likes} likes</p>
                <p><span class="font-bold">${user.username}</span> ${user.comment}</p>
            </section>
        </article>
    `
}
const postToRender = []
for (const post of posts) {
    postToRender.push(renderString(post))
}

if (main) {
    main.innerHTML = postToRender.join("\n")
} else {
    console.log('No element with id "main" found')
}
