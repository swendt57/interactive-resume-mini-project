/* global $ */

function userInformationHTML(userData) {
    console.log(userData);
    return `
        <h2>${userData.name}
            <span class="small-name">
                (@<a href="${userData.html_url}" target="_blank">${userData.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${userData.html_url}" target="_blank">
                    <img src="${userData.avatar_url}" width="80" height="80"alt="${userData.login}"/>
                </a>
            </div>
            <p>Followers: ${userData.followers} - Following ${userData.following} <br/> Public Repos: ${userData.public_repos}</p>
        </div>`
}

function repoInformationHTML(repos) {
    if(repos.length ===0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    
    let listItemHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    })
    
    return `<div class="clearfix repo-list">
        <p>
            <strong>Repo List:</strong>
        </p>
        <ul>
            ${listItemHTML.join("\n")}
        </ul>
    </div>`;
}

function fetchGitHubInformation(e) {
    
    let username = $("#gh-username").val();
    if( ! username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username`);
        return;
    }
    
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
        
        
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse) {
            let userData = firstResponse[0];
            let repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, function(errorResponse) {
            if(errorResponse.statu === 404) {
                $("gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
             } else {
                 console.log(errorResponse);
                 $("gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
             }
        }
    );
}

