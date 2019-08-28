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
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(response) {
            let userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
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

