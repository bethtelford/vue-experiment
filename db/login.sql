select id, name, username, email from users
where username = ${username}
and password = ${password};