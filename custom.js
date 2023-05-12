const repoElement = document.getElementById("repos");
const name = document.getElementById("repo-name");
const description = document.getElementById("repo-desc");
const username = document.getElementById("username");

fetch("https://api.github.com/users/lichtbuch")
    .then(res => res.json())
    .then(user => {
        const img = document.createElement("img");
        img.src = user.avatar_url;
        img.height = 32;
        img.width = 32;

        username.append(img);
    });

fetch("https://api.github.com/users/lichtbuch/repos")
    .then(res => res.json())
    .then(repos => {
        repos
            .forEach(repo => {

                const listElement = document.createElement("li");
                listElement.classList.add("justify-content-between", "d-flex", "py-1");
                listElement.onclick = () => {
                    name.innerText = repo.name;
                    name.href = repo.html_url;
                    description.innerText = repo.description;
                };

                const textElement = document.createElement("span");
                textElement.innerText = repo.name;
                listElement.append(textElement);

                if (repo.fork){
                    const badge = document.createElement("div");
                    badge.classList.add("badge", "bg-primary", "ms-2");
                    badge.innerText = "Contributor";

                    listElement.append(badge);
                }

                repoElement.append(listElement);
            });
    });